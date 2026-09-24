import type {
  CalibrationLabel,
  CalibrationProfile,
  CalibrationSample,
  PersonalMatch,
} from '../types/personalCalibration';
import { CALIBRATION_LABELS } from '../types/personalCalibration';

const STORAGE_KEY = 'vaani.personal-calibration.v2';
const FRAMES = 32;
const FEATURES = 42;
const MAX_PER_CLASS = 12;

const UNKNOWN_THRESHOLD = 0.58;
const STRONG_THRESHOLD = 0.68;
const MIN_MARGIN = 0.055;

export function emptyProfile(): CalibrationProfile {
  return {
    version: 1,
    featureContract: { frames: FRAMES, features: FEATURES },
    samples: [],
  };
}

function validSequence(sequence: number[][]): boolean {
  return (
    sequence.length === FRAMES &&
    sequence.every(
      (frame) =>
        frame.length === FEATURES &&
        frame.every((value) => Number.isFinite(value)),
    )
  );
}

export function loadProfile(): CalibrationProfile {
  if (typeof window === 'undefined') return emptyProfile();

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as
      | CalibrationProfile
      | null;

    if (
      !parsed ||
      parsed.version !== 1 ||
      parsed.featureContract?.frames !== FRAMES ||
      parsed.featureContract?.features !== FEATURES ||
      !Array.isArray(parsed.samples)
    ) {
      return emptyProfile();
    }

    return {
      ...emptyProfile(),
      samples: parsed.samples.filter(
        (sample): sample is CalibrationSample =>
          Boolean(sample) &&
          CALIBRATION_LABELS.includes(sample.label) &&
          validSequence(sample.frames),
      ),
    };
  } catch {
    return emptyProfile();
  }
}

export function saveProfile(profile: CalibrationProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }
}

export function clearProfile(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
}

export function addSample(
  profile: CalibrationProfile,
  label: CalibrationLabel,
  frames: number[][],
): CalibrationProfile {
  if (!validSequence(frames)) {
    throw new Error('Calibration sequence must be exactly 32 × 42.');
  }

  const sample: CalibrationSample = {
    id: 'cal-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
    label,
    createdAt: Date.now(),
    frames: frames.map((frame) => [...frame]),
  };

  const otherClasses = profile.samples.filter((s) => s.label !== label);
  const sameClass = profile.samples
    .filter((s) => s.label === label)
    .concat(sample)
    .slice(-MAX_PER_CLASS);

  return { ...profile, samples: [...otherClasses, ...sameClass] };
}

export function removeLabel(
  profile: CalibrationProfile,
  label: CalibrationLabel,
): CalibrationProfile {
  return {
    ...profile,
    samples: profile.samples.filter((sample) => sample.label !== label),
  };
}

export function sampleCounts(profile: CalibrationProfile): Record<CalibrationLabel, number> {
  return Object.fromEntries(
    CALIBRATION_LABELS.map((label) => [
      label,
      profile.samples.filter((sample) => sample.label === label).length,
    ]),
  ) as Record<CalibrationLabel, number>;
}

function frameDistance(a: number[], b: number[]): number {
  let total = 0;
  for (let i = 0; i < FEATURES; i += 1) {
    const d = a[i] - b[i];
    total += d * d;
  }
  return Math.sqrt(total / FEATURES);
}

function motionDistance(a: number[][], b: number[][]): number {
  let total = 0;

  for (let t = 1; t < FRAMES; t += 1) {
    let frameTotal = 0;

    for (let f = 0; f < FEATURES; f += 1) {
      const av = a[t][f] - a[t - 1][f];
      const bv = b[t][f] - b[t - 1][f];
      const d = av - bv;
      frameTotal += d * d;
    }

    total += Math.sqrt(frameTotal / FEATURES);
  }

  return total / (FRAMES - 1);
}

function sequenceDistance(a: number[][], b: number[][]): number {
  const shape =
    a.reduce((sum, frame, i) => sum + frameDistance(frame, b[i]), 0) / FRAMES;
  const motion = motionDistance(a, b);

  return shape * 0.72 + motion * 0.28;
}

function similarity(distance: number): number {
  return Math.exp(-7.5 * distance);
}

export function matchPersonal(
  frames: number[][],
  profile: CalibrationProfile,
): PersonalMatch {
  if (!validSequence(frames) || profile.samples.length === 0) {
    return {
      label: null,
      similarity: 0,
      distance: Number.POSITIVE_INFINITY,
      margin: 0,
      source: 'unknown',
    };
  }

  const ranked = profile.samples
    .map((sample) => ({
      label: sample.label,
      distance: sequenceDistance(frames, sample.frames),
    }))
    .sort((a, b) => a.distance - b.distance);

  const best = ranked[0];
  const secondDifferent =
    ranked.find((candidate) => candidate.label !== best.label) ?? best;

  const bestClassDistances = ranked
    .filter((candidate) => candidate.label === best.label)
    .slice(0, 3)
    .map((candidate) => candidate.distance);

  const classDistance =
    bestClassDistances.reduce((sum, value) => sum + value, 0) /
    bestClassDistances.length;

  const score = similarity(classDistance);
  const secondScore = similarity(secondDifferent.distance);
  const margin = score - secondScore;

  if (score < UNKNOWN_THRESHOLD || margin < MIN_MARGIN) {
    return {
      label: null,
      similarity: score,
      distance: classDistance,
      margin,
      source: 'unknown',
    };
  }

  return {
    label: best.label,
    similarity: score,
    distance: classDistance,
    margin,
    source: 'personal',
  };
}

export function chooseFinalPrediction(args: {
  personal: PersonalMatch;
  baselineLabel: CalibrationLabel | null;
  baselineConfidence: number;
  baselineThreshold?: number;
}): {
  label: CalibrationLabel | null;
  source: 'personal' | 'model' | 'unknown';
  confidence: number;
} {
  const threshold = args.baselineThreshold ?? 0.55;

  if (args.personal.label && args.personal.similarity >= STRONG_THRESHOLD) {
    return {
      label: args.personal.label,
      source: 'personal',
      confidence: args.personal.similarity,
    };
  }

  if (args.baselineLabel && args.baselineConfidence >= threshold) {
    return {
      label: args.baselineLabel,
      source: 'model',
      confidence: args.baselineConfidence,
    };
  }

  if (args.personal.label && args.personal.similarity >= UNKNOWN_THRESHOLD) {
    return {
      label: args.personal.label,
      source: 'personal',
      confidence: args.personal.similarity,
    };
  }

  return { label: null, source: 'unknown', confidence: 0 };
}
