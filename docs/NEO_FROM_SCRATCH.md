# Vaani Neo from scratch

This branch is a clean Neo subsystem rather than a patch over the old Neo implementation.

## Architecture

One camera pipeline:

Webcam -> MediaPipe Hands (up to 2 hands) + Pose -> shared frame -> recognizer adapter -> stable prediction -> message composer -> TTS

The recognizers never open their own cameras. That removes duplicated camera lifecycle and stale-buffer behavior from the earlier live failures.

## Modes

Smart:
- Uses the compatible word adapter when a word model is present.
- Falls back to the alphabet adapter when the word model is unavailable.

Alphabet A-Z:
- 30-frame rolling sequence.
- 21 MediaPipe hand landmarks x XYZ = 63 features per frame.
- Uses the MIT-licensed public alphabet baseline already added to this branch.
- The upstream repository describes its bundled checkpoint as a synthetic-data baseline, so its reported training number must not be reused as VaaniConnect accuracy.

Words:
- Optional 64 x 102 ONNX adapter for the existing seven-class Vaani model.
- Refuses to invent a result when the model file is missing or below confidence.

## Message layer

The message builder supports:
- Stable vision commits.
- Separate cooldowns for letters and words.
- Manual space, backspace and clear.
- A-Z manual insertion for testing.
- Browser speech synthesis through the existing VaaniConnect hook.

## Live-vision safeguards

- Two-hand detection is shared and visible.
- No-hand frames are not turned into stale recognizer input.
- Inference calls are serialized.
- Leaving the frame clears the active stable prediction.
- Model availability is shown explicitly.
- Debug output exposes hand count, handedness, pose count, recognizer selection and prediction.

## Honest scope

This is a complete interaction shell for the ISL vision system, not a fake claim of full-vocabulary ISL.

At this stage:
- A-Z recognition is covered by the alphabet model.
- The word adapter only covers the classes actually represented by the supplied seven-class Vaani word model.
- A genuinely broad ISL vocabulary still requires a broader validated dataset/model and real-user evaluation.

## Integration

The September local VaaniConnect project is newer than the GitHub main snapshot used as the branch base.

Copy the Neo files into the current local project rather than replacing the current App.

Add this import:

import { Neo } from './neo/Neo';

Mount <Neo /> inside the existing Vaani Neo route/mode.

Keep Communicate, TTS, Learn, Practice, Hardware, Team and Profile unchanged.

Keep the existing static ORT WASM path already present in the September project. Do not replace it with a CDN WASM path.

## Verification

1. Run the alphabet model export script and confirm public/models/vaani-isl-alphabet/model.onnx exists.
2. Put the compatible Vaani word model at public/models/vaani-isl/model.onnx only when it matches the documented 64 x 102 contract.
3. Run typecheck.
4. Run the production build.
5. Test one-hand A-Z recognition on a real webcam.
6. Test two-hand detection.
7. Test no-hand reset and repeated letters.
8. Test message controls and TTS.
