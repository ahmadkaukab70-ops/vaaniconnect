import type { InferenceSession } from 'onnxruntime-web';
import type { AlphabetPrediction, IslAlphabetLabel } from '../types/islAlphabet';
import { ISL_ALPHABET } from '../types/islAlphabet';

const SEQUENCE_LENGTH = 30;
const FEATURE_SIZE = 63;
const CONFIDENCE_THRESHOLD = 0.8;
const STABILITY_FRAMES = 8;

let ortModule: typeof import('onnxruntime-web') | null = null;
let session: InferenceSession | null = null;
const history: string[] = [];

export async function loadIslAlphabetClassifier(): Promise<void> {
  if (session) return;
  ortModule ??= await import('onnxruntime-web');
  ortModule.env.wasm.wasmPaths = import.meta.env.BASE_URL + 'ort/ort-wasm-simd-threaded.jsep.wasm';
  session = await ortModule.InferenceSession.create(
    import.meta.env.BASE_URL + 'models/vaani-isl-alphabet/model.onnx',
    { executionProviders: ['wasm'], graphOptimizationLevel: 'all' },
  );
}

export function resetIslAlphabetClassifier(): void { history.length = 0; }

export async function predictIslAlphabet(sequence: number[][]): Promise<AlphabetPrediction> {
  if (!session || !ortModule) throw new Error('ISL alphabet model is not loaded.');
  if (sequence.length !== SEQUENCE_LENGTH || sequence.some((frame) => frame.length !== FEATURE_SIZE)) {
    throw new Error('Expected a 30 × 63 alphabet sequence.');
  }
  const tensor = new ortModule.Tensor('float32', new Float32Array(sequence.flat()), [1, SEQUENCE_LENGTH, FEATURE_SIZE]);
  const outputs = await session.run({ [session.inputNames[0]]: tensor });
  const output = outputs[session.outputNames[0]];
  const logits = Array.from(output.data as Float32Array);
  const maxLogit = Math.max(...logits);
  const exps = logits.map((value) => Math.exp(value - maxLogit));
  const denominator = exps.reduce((sum, value) => sum + value, 0);
  const probabilities = exps.map((value) => value / denominator);
  let best = 0;
  for (let i = 1; i < probabilities.length; i += 1) if (probabilities[i] > probabilities[best]) best = i;
  const confidence = probabilities[best] ?? 0;
  const label = ISL_ALPHABET[best] ?? null;
  history.push(label ?? '');
  if (history.length > STABILITY_FRAMES) history.shift();
  const stable = history.length === STABILITY_FRAMES && history.every((entry) => entry === label) && confidence >= CONFIDENCE_THRESHOLD;
  return { label, confidence, stable };
}

export function buildAlphabetFeatureFrame(landmarks: readonly { x: number; y: number; z: number }[] | null): number[] {
  if (!landmarks || landmarks.length !== 21) return Array(FEATURE_SIZE).fill(0);
  const wrist = landmarks[0];
  const frame: number[] = [];
  for (const point of landmarks) frame.push(point.x - wrist.x, point.y - wrist.y, point.z - wrist.z);
  return frame;
}
