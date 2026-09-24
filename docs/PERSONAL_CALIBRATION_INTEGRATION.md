# Vaani Vision Personal Calibration

This branch contains an isolated personalization layer for the existing six-class Neo Vision contract.

## Files

- src/types/personalCalibration.ts
- src/services/personalCalibration.ts
- src/components/NeoPersonalCalibration.tsx
- src/styles/neoPersonalCalibration.css

## Existing contract

The current Vaani Vision pipeline is:

MediaPipe Hands -> wrist-centred/scaled preprocessing -> 32 frames x 42 features -> ONNX.

Do not create a second MediaPipe pipeline.

## Integration

In NeoVisionView, expose a callback that returns the exact same normalized 32 x 42 sequence already sent to ONNX:

```tsx
<NeoPersonalCalibration captureSequence={captureCalibrationSequence} />
```

The callback should:

1. Wait for a fresh hand-present sequence.
2. Reuse the existing inference buffer.
3. Reuse the existing buildInput/preprocessing function.
4. Return 32 x 42 frames.
5. Return null when a clean sequence is not available within a reasonable timeout.

At final prediction time:

```ts
const personal = matchPersonal(currentSequence, profile);

const finalPrediction = chooseFinalPrediction({
  personal,
  baselineLabel,
  baselineConfidence,
  baselineThreshold: 0.55,
});
```

If `finalPrediction.label` is null, display UNKNOWN/UNSURE rather than forcing one of the six classes.

## Product behavior

The personal layer stores 1-12 examples per class in localStorage.

It uses a lightweight sequence distance combining:

- frame landmark similarity
- temporal motion similarity

It is not a new neural network.

It does not alter the published test accuracy of the baseline model.

## Test requirements

After integration:

```
npm.cmd run typecheck
npm.cmd run build
```

Then manually test:

- record multiple examples for a sign
- perform that sign
- confirm the result source is Personal
- perform an uncalibrated/random motion
- confirm UNKNOWN/UNSURE can appear
- verify existing baseline recognition still works
- verify Pattern mode and TTS are unchanged

Do not deploy automatically.
