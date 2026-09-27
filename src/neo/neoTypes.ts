export type NeoMode = 'smart' | 'alphabet' | 'words';

export type NeoTokenKind = 'letter' | 'word';

export interface NeoToken {
  id: string;
  text: string;
  kind: NeoTokenKind;
  confidence?: number;
  source: 'vision' | 'manual';
  createdAt: number;
}

export interface NeoPrediction {
  label: string | null;
  confidence: number;
  stable: boolean;
  kind: NeoTokenKind;
}

export interface NeoFrame {
  timestamp: number;
  handsDetected: number;
  primaryHand: 'left' | 'right' | null;
  landmarks: readonly { x: number; y: number; z: number }[] | null;
  handSlots: [
    readonly { x: number; y: number; z: number }[],
    readonly { x: number; y: number; z: number }[],
  ];
  pose: readonly { x: number; y: number; z: number }[];
  handedness: Array<'left' | 'right'>;
}
