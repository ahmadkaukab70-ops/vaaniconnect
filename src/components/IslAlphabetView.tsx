import { useCallback, useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { buildAlphabetFeatureFrame, loadIslAlphabetClassifier, predictIslAlphabet, resetIslAlphabetClassifier } from '../services/islAlphabetClassifier';
import type { IslAlphabetLabel } from '../types/islAlphabet';

const LANDMARKER_URL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const SEQUENCE_LENGTH = 30;

export function IslAlphabetView() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handRef = useRef<HandLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef(-1);
  const sequenceRef = useRef<number[][]>([]);
  const lastAppendedRef = useRef<IslAlphabetLabel | null>(null);
  const [camera, setCamera] = useState<'idle' | 'starting' | 'ready' | 'error'>('idle');
  const [handDetected, setHandDetected] = useState(false);
  const [letter, setLetter] = useState<IslAlphabetLabel | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [sentence, setSentence] = useState('');
  const [error, setError] = useState('');
  const { speak } = useTextToSpeech();

  const stopCamera = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    handRef.current?.close();
    handRef.current = null;
    sequenceRef.current = [];
    lastTimestampRef.current = -1;
    lastAppendedRef.current = null;
    resetIslAlphabetClassifier();
    setHandDetected(false);
    setCamera('idle');
  }, []);

  const processFrame = useCallback(async (timestamp: number) => {
    const video = videoRef.current;
    const detector = handRef.current;
    if (!video || !detector || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }
    const ms = Math.max(timestamp, lastTimestampRef.current + 1);
    lastTimestampRef.current = ms;
    const result = detector.detectForVideo(video, ms);
    const landmarks = result.landmarks?.[0] ?? null;
    setHandDetected(Boolean(landmarks));
    sequenceRef.current.push(buildAlphabetFeatureFrame(landmarks));
    if (sequenceRef.current.length > SEQUENCE_LENGTH) sequenceRef.current.shift();
    if (sequenceRef.current.length === SEQUENCE_LENGTH) {
      try {
        const prediction = await predictIslAlphabet(sequenceRef.current);
        setLetter(prediction.label);
        setConfidence(prediction.confidence);
        if (prediction.stable && prediction.label && prediction.label !== lastAppendedRef.current) {
          setSentence((current) => current + prediction.label);
          lastAppendedRef.current = prediction.label;
        }
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Alphabet inference failed.');
      }
    }
    rafRef.current = requestAnimationFrame(processFrame);
  }, []);

  const startCamera = useCallback(async () => {
    if (camera === 'starting' || camera === 'ready') return;
    setCamera('starting');
    setError('');
    try {
      const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm');
      handRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: LANDMARKER_URL },
        runningMode: 'VIDEO', numHands: 1,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      await loadIslAlphabetClassifier();
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 1280, height: 720 }, audio: false });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) throw new Error('Video element unavailable.');
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();
      setCamera('ready');
      rafRef.current = requestAnimationFrame(processFrame);
    } catch (cause) {
      stopCamera();
      setError(cause instanceof Error ? cause.message : 'Could not start alphabet camera.');
      setCamera('error');
    }
  }, [camera, processFrame, stopCamera]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  return (
    <section className='isl-alphabet' aria-labelledby='isl-alphabet-title'>
      <div className='isl-alphabet__header'>
        <div><span className='isl-alphabet__eyebrow'>VAANI VISION</span><h2 id='isl-alphabet-title'>ISL Alphabet</h2><p>A–Z fingerspelling with live landmark recognition.</p></div>
        <div className='isl-alphabet__status'><span>{camera === 'ready' ? 'LIVE' : camera.toUpperCase()}</span><small>{handDetected ? 'Hand detected' : 'No hand detected'}</small></div>
      </div>
      <div className='isl-alphabet__camera'><video ref={videoRef} aria-label='ISL alphabet camera preview' autoPlay playsInline muted /><div className='isl-alphabet__prediction' aria-live='polite'><span>{letter ?? '—'}</span><small>{letter ? Math.round(confidence * 100) + '%' : 'Show a letter'}</small></div></div>
      <div className='isl-alphabet__toolbar'>
        <button type='button' onClick={camera === 'ready' ? stopCamera : startCamera}>{camera === 'ready' ? 'Stop Camera' : 'Start Camera'}</button>
        <button type='button' onClick={() => setSentence('')}>Clear</button>
        <button type='button' onClick={() => setSentence((current) => current.slice(0, -1))}>Backspace</button>
        <button type='button' onClick={() => setSentence((current) => current + ' ')}>Space</button>
        <button type='button' onClick={() => speak(sentence)} disabled={!sentence.trim()}>Speak</button>
      </div>
      <div className='isl-alphabet__sentence'><span>MESSAGE</span><strong>{sentence || 'Your letters will appear here.'}</strong></div>
      {error && <p className='isl-alphabet__error' role='alert'>{error}</p>}
    </section>
  );
}
