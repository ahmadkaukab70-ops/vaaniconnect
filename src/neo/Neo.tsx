import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import {
  buildAlphabetFeatureFrame,
  loadIslAlphabetClassifier,
  predictIslAlphabet,
  resetIslAlphabetClassifier,
} from '../services/islAlphabetClassifier';
import {
  loadNeoWordAdapter,
  predictNeoWord,
  resetNeoWordAdapter,
} from '../services/neoWordAdapter';
import type { NeoFrame, NeoMode, NeoPrediction, NeoToken } from './neoTypes';
import { NeoVisionEngine } from './neoVisionEngine';
import '../styles/neo.css';

const ALPHABET_SEQUENCE_LENGTH = 30;
const ALPHABET_COOLDOWN_MS = 900;
const WORD_COOLDOWN_MS = 1400;

function uid(): string {
  return String(Date.now()) + '-' + Math.random().toString(36).slice(2, 9);
}

export function Neo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const engineRef = useRef<NeoVisionEngine | null>(null);
  const alphabetSequenceRef = useRef<number[][]>([]);
  const inferenceBusyRef = useRef(false);
  const lastCommitRef = useRef<{ label: string; at: number } | null>(null);
  const handPresenceRef = useRef(false);

  const [mode, setMode] = useState<NeoMode>('smart');
  const [camera, setCamera] = useState<'idle' | 'starting' | 'ready' | 'error'>('idle');
  const [frame, setFrame] = useState<NeoFrame | null>(null);
  const [prediction, setPrediction] = useState<NeoPrediction>({
    label: null,
    confidence: 0,
    stable: false,
    kind: 'letter',
  });
  const [tokens, setTokens] = useState<NeoToken[]>([]);
  const [wordModelReady, setWordModelReady] = useState(false);
  const [alphabetModelReady, setAlphabetModelReady] = useState(false);
  const [activeRecognizer, setActiveRecognizer] = useState<'alphabet' | 'words' | 'none'>('none');
  const [error, setError] = useState('');
  const [debug, setDebug] = useState(false);
  const { speak } = useTextToSpeech();

  const message = useMemo(
    () => tokens.map((token) => token.text).join(''),
    [tokens],
  );

  const clearRecognitionState = useCallback(() => {
    alphabetSequenceRef.current = [];
    resetIslAlphabetClassifier();
    resetNeoWordAdapter();
    lastCommitRef.current = null;
    setPrediction({
      label: null,
      confidence: 0,
      stable: false,
      kind: 'letter',
    });
  }, []);

  const commit = useCallback(
    (label: string, kind: 'letter' | 'word', confidence: number) => {
      const now = Date.now();
      const cooldown = kind === 'letter' ? ALPHABET_COOLDOWN_MS : WORD_COOLDOWN_MS;
      const last = lastCommitRef.current;

      if (last && last.label === label && now - last.at < cooldown) return;

      const spacer = kind === 'word' && tokens.length > 0 ? ' ' : '';
      setTokens((current) => [
        ...current,
        {
          id: uid(),
          text: spacer + label,
          kind,
          confidence,
          source: 'vision',
          createdAt: now,
        },
      ]);

      lastCommitRef.current = { label, at: now };
    },
    [tokens.length],
  );

  const runAlphabet = useCallback(
    async (next: NeoFrame) => {
      const feature = buildAlphabetFeatureFrame(next.landmarks);
      alphabetSequenceRef.current.push(feature);

      if (alphabetSequenceRef.current.length > ALPHABET_SEQUENCE_LENGTH) {
        alphabetSequenceRef.current.shift();
      }

      if (alphabetSequenceRef.current.length < ALPHABET_SEQUENCE_LENGTH) return;

      const result = await predictIslAlphabet(alphabetSequenceRef.current);
      const nextPrediction: NeoPrediction = {
        label: result.label,
        confidence: result.confidence,
        stable: result.stable,
        kind: 'letter',
      };

      setPrediction(nextPrediction);
      setActiveRecognizer('alphabet');

      if (result.stable && result.label) {
        commit(result.label, 'letter', result.confidence);
      }
    },
    [commit],
  );

  const runWords = useCallback(
    async (next: NeoFrame) => {
      const result = await predictNeoWord(next);

      if (!result) return;

      setPrediction(result);
      setActiveRecognizer('words');

      if (result.stable && result.label) {
        commit(result.label, 'word', result.confidence);
      }
    },
    [commit],
  );

  const handleFrame = useCallback(
    async (next: NeoFrame) => {
      setFrame(next);

      const present = next.handsDetected > 0;
      if (!present) {
        if (handPresenceRef.current) {
          clearRecognitionState();
        }
        handPresenceRef.current = false;
        setActiveRecognizer('none');
        return;
      }

      handPresenceRef.current = true;

      if (inferenceBusyRef.current) return;
      inferenceBusyRef.current = true;

      try {
        const useWords =
          (mode === 'words' || mode === 'smart') && wordModelReady;
        const useAlphabet =
          mode === 'alphabet' ||
          (mode === 'smart' && !wordModelReady);

        if (useWords) {
          await runWords(next);
        } else if (useAlphabet && alphabetModelReady) {
          await runAlphabet(next);
        } else {
          setActiveRecognizer('none');
        }
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Vision inference failed.');
      } finally {
        inferenceBusyRef.current = false;
      }
    },
    [
      alphabetModelReady,
      clearRecognitionState,
      mode,
      runAlphabet,
      runWords,
      wordModelReady,
    ],
  );

  const start = useCallback(async () => {
    if (camera === 'starting' || camera === 'ready') return;

    const video = videoRef.current;
    if (!video) return;

    setCamera('starting');
    setError('');
    clearRecognitionState();

    try {
      let loadedAlphabet = false;

      try {
        await loadIslAlphabetClassifier();
        loadedAlphabet = true;
      } catch (cause) {
        setError(
          cause instanceof Error
            ? 'Alphabet model unavailable: ' + cause.message
            : 'Alphabet model unavailable.',
        );
      }

      const loadedWords = await loadNeoWordAdapter();

      setAlphabetModelReady(loadedAlphabet);
      setWordModelReady(loadedWords);

      if (!loadedAlphabet && !loadedWords) {
        throw new Error('No ISL model is available.');
      }

      const engine = new NeoVisionEngine();
      engineRef.current = engine;
      await engine.start(video, handleFrame);
      setCamera('ready');
    } catch (cause) {
      engineRef.current?.stop();
      engineRef.current = null;
      setCamera('error');
      setError(cause instanceof Error ? cause.message : 'Could not start Vaani Neo.');
    }
  }, [camera, clearRecognitionState, handleFrame]);

  const stop = useCallback(() => {
    engineRef.current?.stop();
    engineRef.current = null;
    clearRecognitionState();
    handPresenceRef.current = false;
    setFrame(null);
    setCamera('idle');
    setActiveRecognizer('none');
  }, [clearRecognitionState]);

  useEffect(() => () => stop(), [stop]);

  useEffect(() => {
    clearRecognitionState();
  }, [clearRecognitionState, mode]);

  const addManual = (value: string) => {
    setTokens((current) => [
      ...current,
      {
        id: uid(),
        text: value,
        kind: 'letter',
        source: 'manual',
        createdAt: Date.now(),
      },
    ]);
  };

  const removeLast = () => setTokens((current) => current.slice(0, -1));

  const setSpace = () => {
    setTokens((current) => [
      ...current,
      {
        id: uid(),
        text: ' ',
        kind: 'word',
        source: 'manual',
        createdAt: Date.now(),
      },
    ]);
  };

  const clearMessage = () => setTokens([]);

  return (
    <section className="neo-shell" aria-labelledby="neo-title">
      <header className="neo-head">
        <div>
          <span className="neo-kicker">VAANI NEO / ISL</span>
          <h1 id="neo-title">Live Indian Sign Language interface</h1>
          <p>One camera, two hands, multiple recognition backends, one message.</p>
        </div>

        <div className="neo-head-status">
          <span className={camera === 'ready' ? 'is-live' : ''}>{camera.toUpperCase()}</span>
          <small>{frame?.handsDetected ?? 0}/2 hands</small>
        </div>
      </header>

      <div className="neo-modebar" role="tablist" aria-label="ISL recognition mode">
        {(['smart', 'alphabet', 'words'] as NeoMode[]).map((item) => (
          <button
            key={item}
            type="button"
            className={mode === item ? 'active' : ''}
            role="tab"
            aria-selected={mode === item}
            onClick={() => setMode(item)}
          >
            {item === 'smart' ? 'Smart' : item === 'alphabet' ? 'Alphabet A–Z' : 'Words'}
          </button>
        ))}
      </div>

      <div className="neo-model-status">
        <span className={alphabetModelReady ? 'ready' : ''}>
          Alphabet {alphabetModelReady ? 'ready' : 'missing'}
        </span>
        <span className={wordModelReady ? 'ready' : ''}>
          Word model {wordModelReady ? 'ready' : 'optional'}
        </span>
        <strong>
          {activeRecognizer === 'none'
            ? 'No recognizer'
            : activeRecognizer === 'alphabet'
              ? 'A–Z recognizer'
              : 'Word recognizer'}
        </strong>
      </div>

      <div className="neo-grid">
        <div className="neo-camera">
          <video ref={videoRef} autoPlay playsInline muted aria-label="Vaani Neo camera" />

          <div className="neo-camera-overlay">
            <span>{frame?.handsDetected ? 'TRACKING' : 'SHOW YOUR HANDS'}</span>
            <span>
              {frame?.primaryHand
                ? frame.primaryHand.toUpperCase() + ' PRIMARY'
                : 'WAITING'}
            </span>
          </div>

          <div className="neo-prediction" aria-live="polite">
            <small>{prediction.kind.toUpperCase()}</small>
            <strong>{prediction.label ?? '—'}</strong>
            <span>
              {prediction.confidence
                ? Math.round(prediction.confidence * 100) + '%'
                : 'No confident sign'}
            </span>
          </div>
        </div>

        <aside className="neo-panel">
          <div className="neo-message-label">MESSAGE</div>
          <div className="neo-message">
            {message || 'Your translated message will appear here.'}
          </div>

          <div className="neo-controls">
            <button type="button" onClick={camera === 'ready' ? stop : start}>
              {camera === 'ready' ? 'Stop camera' : 'Start camera'}
            </button>
            <button type="button" onClick={clearMessage}>Clear</button>
            <button type="button" onClick={removeLast}>Backspace</button>
            <button type="button" onClick={setSpace}>Space</button>
            <button type="button" onClick={() => speak(message)} disabled={!message.trim()}>
              Speak
            </button>
          </div>

          <div className="neo-letter-grid" aria-label="ISL alphabet reference">
            {[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((letter) => (
              <button
                key={letter}
                type="button"
                title={'Insert ' + letter}
                onClick={() => addManual(letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="neo-diagnostics">
            <div><span>Hands</span><strong>{frame?.handsDetected ?? 0}/2</strong></div>
            <div><span>Mode</span><strong>{mode}</strong></div>
            <div><span>Recognizer</span><strong>{activeRecognizer}</strong></div>
          </div>

          <label className="neo-debug-toggle">
            <input
              type="checkbox"
              checked={debug}
              onChange={(event) => setDebug(event.target.checked)}
            />
            Show diagnostic details
          </label>

          {debug && (
            <pre className="neo-debug">
{JSON.stringify({
  mode,
  hands: frame?.handsDetected ?? 0,
  handedness: frame?.handedness ?? [],
  primary: frame?.primaryHand ?? null,
  posePoints: frame?.pose.length ?? 0,
  alphabetModelReady,
  wordModelReady,
  activeRecognizer,
  prediction,
}, null, 2)}
            </pre>
          )}

          {error && <p className="neo-error" role="alert">{error}</p>}
        </aside>
      </div>
    </section>
  );
}
