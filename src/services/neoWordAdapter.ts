import type { InferenceSession } from 'onnxruntime-web';
import type { NeoFrame, NeoPrediction } from '../neo/neoTypes';

export const NEO_WORD_LABELS = [
  'friend',
  'hello',
  'hospital',
  'market',
  'okay',
  'school',
  'thank_you',
] as const;

const SEQUENCE_LENGTH = 64;
const FEATURE_SIZE = 102;
const TEMPERATURE = 1.5;
const THRESHOLD = 0.70;
const MIN_BUFFER = 24;
const MIN_HAND_PRESENCE = 0.35;

let ortModule: typeof import('onnxruntime-web') | null = null;
let session: InferenceSession | null = null;
let buffer: number[][] = [];

export function resetNeoWordAdapter(): void {
  buffer = [];
}

function buildFrame(frame: NeoFrame): number[] {
  const values: number[] = [];

  for (const slot of frame.handSlots) {
    if (slot.length === 21) {
      for (const point of slot) values.push(point.x, point.y);
    } else {
      for (let i = 0; i < 42; i += 1) values.push(0);
    }
  }

  for (const index of [11, 12, 13, 14, 15, 16, 23, 24]) {
    const point = frame.pose[index];
    values.push(point?.x ?? 0, point?.y ?? 0);
  }

  values.push(frame.handSlots[0].length === 21 ? 1 : 0);
  values.push(frame.handSlots[1].length === 21 ? 1 : 0);

  const allHands = frame.handSlots.flat();
  const anchor = frame.handSlots[0];

  let cx = 0;
  let cy = 0;
  let scale = 0;

  if (anchor.length === 21) {
    cx = anchor[0].x;
    cy = anchor[0].y;
    scale = Math.hypot(anchor[0].x - anchor[1].x, anchor[0].y - anchor[1].y);
  }

  if (scale < 1e-5 && allHands.length) {
    cx = allHands.reduce((sum, p) => sum + p.x, 0) / allHands.length;
    cy = allHands.reduce((sum, p) => sum + p.y, 0) / allHands.length;
    scale = Math.max(
      ...allHands.map((p) => Math.hypot(p.x - cx, p.y - cy)),
      1e-5,
    );
  }

  for (let i = 0; i < 100; i += 2) {
    values[i] = (values[i] - cx) / scale;
    values[i + 1] = (values[i + 1] - cy) / scale;
  }

  if (values.length !== FEATURE_SIZE) {
    throw new Error('Neo word feature contract produced the wrong size.');
  }

  return values;
}

function resample(sequence: number[][]): number[][] {
  if (sequence.length === SEQUENCE_LENGTH) return sequence;
  const output: number[][] = [];

  for (let i = 0; i < SEQUENCE_LENGTH; i += 1) {
    const position = (i * (sequence.length - 1)) / (SEQUENCE_LENGTH - 1);
    const left = Math.floor(position);
    const right = Math.min(Math.ceil(position), sequence.length - 1);
    const t = position - left;
    const a = sequence[left];
    const b = sequence[right];
    output.push(a.map((value, j) => value + (b[j] - value) * t));
  }

  return output;
}

function softmax(logits: number[]): number[] {
  const scaled = logits.map((value) => value / TEMPERATURE);
  const max = Math.max(...scaled);
  const exponentials = scaled.map((value) => Math.exp(value - max));
  const total = exponentials.reduce((a, b) => a + b, 0) || 1;
  return exponentials.map((value) => value / total);
}

export async function loadNeoWordAdapter(
  modelUrl = import.meta.env.BASE_URL + 'models/vaani-isl/model.onnx',
): Promise<boolean> {
  if (session) return true;

  try {
    ortModule ??= await import('onnxruntime-web');
    ortModule.env.wasm.wasmPaths =
      import.meta.env.BASE_URL + 'ort/ort-wasm-simd-threaded.jsep.wasm';

    session = await ortModule.InferenceSession.create(modelUrl, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });

    return true;
  } catch {
    session = null;
    return false;
  }
}

export async function predictNeoWord(frame: NeoFrame): Promise<NeoPrediction | null> {
  if (!session || !ortModule) return null;

  buffer.push(buildFrame(frame));
  if (buffer.length > SEQUENCE_LENGTH) buffer.shift();

  const presence =
    buffer.reduce(
      (count, values) => count + (values[100] > 0 || values[101] > 0 ? 1 : 0),
      0,
    ) / Math.max(buffer.length, 1);

  if (buffer.length < MIN_BUFFER || presence < MIN_HAND_PRESENCE) return null;

  const sequence = resample(buffer);
  const tensor = new ortModule.Tensor(
    'float32',
    new Float32Array(sequence.flat()),
    [1, SEQUENCE_LENGTH, FEATURE_SIZE],
  );

  const outputs = await session.run({
    [session.inputNames[0]]: tensor,
  });

  const output = outputs[session.outputNames[0]];
  const probabilities = softmax(Array.from(output.data as Float32Array));

  let best = 0;
  for (let i = 1; i < probabilities.length; i += 1) {
    if (probabilities[i] > probabilities[best]) best = i;
  }

  const confidence = probabilities[best] ?? 0;
  if (confidence < THRESHOLD) {
    return { label: null, confidence, stable: false, kind: 'word' };
  }

  return {
    label: NEO_WORD_LABELS[best] ?? null,
    confidence,
    stable: true,
    kind: 'word',
  };
}
