# OpenCode integration prompt: Vaani Neo rebuild

Use the current September local project at:

C:\Users\HP\Desktop\vaani connect  (codex)

Do not replace the project with the GitHub main branch. That GitHub main snapshot is older than the current local build.

Source branch for the new Neo subsystem:

feature/neo-full-isl-rebuild

Bring these files into the current local project:

src/neo/neoTypes.ts
src/neo/neoVisionEngine.ts
src/neo/Neo.tsx
src/services/neoWordAdapter.ts
src/styles/neo.css
docs/NEO_FROM_SCRATCH.md

The alphabet files are already on the earlier alphabet branch:

src/types/islAlphabet.ts
src/services/islAlphabetClassifier.ts
src/components/IslAlphabetView.tsx
src/styles/islAlphabet.css
ml/alphabet/fetch_and_export.py

Integration requirements:

1. Keep all existing VaaniConnect modes untouched:
Communicate, TTS, Learn, Practice, Hardware, Team, Profile.

2. Replace the old Vaani Neo screen with the new Neo component instead of merging pieces of the old Neo implementation.

3. Mount:
import { Neo } from './neo/Neo';

inside the existing Neo route/mode.

4. Make the Neo camera the only camera owner.
Do not let alphabet, word or calibration submodules open separate cameras.

5. Keep the existing ORT WASM static asset configuration already present in the September project:
public/ort/ort-wasm-simd-threaded.jsep.wasm

Do not introduce a new CDN ORT WASM path.

6. The shared detector must support up to two hands. The UI must show the number of detected hands and handedness.

7. Alphabet mode must use:
30 frames x 63 features
21 hand landmarks x XYZ
wrist-relative normalization
A-Z labels

Do not mix the alphabet 30 x 63 contract with the old 64 x 102 word contract.

8. Word mode is optional. Only activate it when this exact model exists:
public/models/vaani-isl/model.onnx

It must match the existing Vaani 64 x 102 seven-class contract.

9. Smart mode should:
- try the word model when available
- continuously feed the alphabet model too
- prefer a stable word result
- fall back to a stable alphabet result
- never invent a result below model confidence

10. No stale-frame bug:
- no-hand frames must reset recognition state
- do not append null/empty frames to a live sign sequence
- leaving the frame clears the last stable sign

11. No inference pile-up:
- only one ONNX inference may be running at once
- dropped frames are acceptable
- UI must stay responsive

12. Message builder:
- stable recognition commits a token once
- repeated signs require cooldown / re-entry
- manual Space, Backspace, Clear
- Speak through the existing VaaniConnect TTS hook
- A-Z manual buttons are for testing only and should not be presented as recognition

13. Keep the diagnostics panel because it is needed for live debugging:
- hands detected
- handedness
- primary hand
- pose point count
- active recognizer
- model availability
- confidence

14. Do not claim “full ISL vocabulary” in the UI or documentation.
The current real recognition assets cover A-Z plus the existing seven word classes only. Broad-vocabulary ISL requires a larger validated model and real-user evaluation.

15. Fetch/export the alphabet model with:
python ml/alphabet/fetch_and_export.py

Expected output:
public/models/vaani-isl-alphabet/model.onnx

16. Run:
npm.cmd run typecheck
npm.cmd run build

If the project has no typecheck script, use the project's existing TypeScript validation command.

17. Test on a real webcam:
- one-hand A-Z
- repeated same letter
- no hand
- two hands visible
- switch Smart / Alphabet / Words while camera stays on
- clear/backspace/space
- TTS
- model missing fallback behavior

18. Do not deploy.

The target is one polished Vaani Neo screen with one camera pipeline and modular ISL recognizers, not a pile of separate webcam demos.
