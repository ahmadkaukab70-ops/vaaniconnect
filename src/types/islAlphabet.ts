export const ISL_ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'] as const;

export type IslAlphabetLabel = (typeof ISL_ALPHABET)[number];

export interface AlphabetPrediction { label: IslAlphabetLabel | null; confidence: number; stable: boolean; }
