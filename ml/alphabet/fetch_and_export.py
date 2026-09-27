import json
import pathlib
import urllib.request
import tensorflow as tf
import tf2onnx

SOURCE = "https://raw.githubusercontent.com/harinym112/Indian-SignLanguage-Translator/main/model/isl_lstm_model.keras"
OUT_DIR = pathlib.Path("public/models/vaani-isl-alphabet")
KERAS_PATH = OUT_DIR / "isl_lstm_model.keras"
ONNX_PATH = OUT_DIR / "model.onnx"
VOCAB_PATH = OUT_DIR / "vocab.json"
LABELS = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if not KERAS_PATH.exists():
        urllib.request.urlretrieve(SOURCE, KERAS_PATH)
    model = tf.keras.models.load_model(KERAS_PATH, compile=False)
    if tuple(model.input_shape) != (None, 30, 63):
        raise RuntimeError("Unexpected model input: " + str(model.input_shape))
    spec = (tf.TensorSpec((1, 30, 63), tf.float32, name="landmarks"),)
    tf2onnx.convert.from_keras(model, input_signature=spec, opset=18, output_path=str(ONNX_PATH))
    VOCAB_PATH.write_text(json.dumps({"classes": LABELS, "source": "harinym112/Indian-SignLanguage-Translator", "license": "MIT"}, indent=2), encoding="utf-8")
    print("ONNX:", ONNX_PATH)
    print("Input: [1, 30, 63]")
    print("Classes:", LABELS)

if __name__ == "__main__":
    main()
