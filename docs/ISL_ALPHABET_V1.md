# VaaniConnect ISL Alphabet v1

This is an isolated-letter/fingerspelling recognizer, not a word-level ISL translator.

Upstream source: https://github.com/harinym112/Indian-SignLanguage-Translator

The upstream repository is MIT-licensed and documents 26 A-Z classes, 21 MediaPipe hand landmarks x XYZ = 63 features/frame, a 30-frame sequence and a TensorFlow/Keras LSTM. Its README says the bundled pretrained weights are a synthetic-data baseline and recommends real-data retraining for better accuracy.

Run `python ml/alphabet/fetch_and_export.py` to fetch the public checkpoint and export `public/models/vaani-isl-alphabet/model.onnx`.

Contract: 30 frames x 63 features, wrist-relative XYZ coordinates, one detected hand, output order A-Z.

Do not report the upstream 88%+ figure as VaaniConnect accuracy. That figure is described for real-data retraining in the upstream README.