export type CalibrationLabel =
  | 'hello'
  | 'thank_you'
  | 'friend'
  | 'hospital'
  | 'market'
  | 'school';

export const CALIBRATION_LABELS: CalibrationLabel[] = [
  'hello', 'thank_you', 'friend', 'hospital', 'market', 'school',
];

export const CALIBRATION_LABEL_NAMES: Record<CalibrationLabel, string> = {
  hello: 'Hello',
  thank_you: 'Thank You',
  friend: 'Friend',
  hospital: 'Hospital',
  market: 'Market',
  school: 'School',
};

export interface CalibrationSample {
  id: string;
  label: CalibrationLabel;
  createdAt: number;
  frames: number[][];
}

export interface CalibrationProfile {
  version: 1;
  featureContract: { frames: 32; features: 42 };
  samples: CalibrationSample[];
}

export interface PersonalMatch {
  label: CalibrationLabel | null;
  similarity: number;
  distance: number;
  margin: number;
  source: 'personal' | 'unknown';
}
