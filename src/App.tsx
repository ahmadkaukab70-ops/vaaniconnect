import React from 'react'
import './index.css'

const pipeline = [
  'Camera capture with MediaPipe Hands (30+ FPS)',
  'Smart glove stream (flex sensors + IMU over BLE/serial)',
  'Timestamp alignment + normalization',
  'Fusion inference (CNN + LSTM/GRU)',
  'Sentence builder + TTS output',
]

const hardware = [
  '5 flex sensors with voltage-divider wiring (10kΩ reference)',
  '9-DOF IMU (accel/gyro/magnetometer) with startup calibration',
  'ESP32/Arduino firmware with smoothing filter',
  'Structured packets: ts, flex1..5, acc/gyro/mag axes',
]

const deployment = [
  'React + Vite frontend with in-browser MediaPipe/TensorFlow.js',
  'Optional FastAPI/Express backend for model hosting + websocket events',
  'Firestore/Supabase for user boards and preferences',
  'Containerized services with CI checks and HTTPS-only camera access',
]

export default function App() {
  return (
    <main className="app-shell">
      <div className="container">
        <p className="brand">VaaniConnect</p>
        <h1>Multimodal Sign Language Recognition Blueprint</h1>
        <p className="intro">
          This prototype outlines a camera + smart-glove architecture for robust sign recognition.
          Vision landmarks capture hand position/motion, while flex and IMU readings improve
          reliability during occlusion, poor lighting, or depth ambiguity.
        </p>

        <section className="grid-3">
          <Card title="Real-time pipeline" items={pipeline} />
          <Card title="Glove hardware + firmware" items={hardware} />
          <Card title="Deployment stack" items={deployment} />
        </section>

        <section className="fusion-box">
          <h2>Fusion strategy</h2>
          <p>
            Prefer feature-level fusion for sequence models: concatenate MediaPipe landmarks/joint
            angles with normalized flex + IMU signals per frame, then classify in temporal windows
            (e.g., 60–90 frames). Fall back to decision-level weighted voting when one modality is
            degraded.
          </p>
          <div className="grid-2">
            <Info label="Static signs" value="Single-frame or short-window fused classification" />
            <Info label="Dynamic signs" value="Sliding windows with LSTM/GRU/Transformer" />
            <Info label="Target metrics" value="Top-1 accuracy, confusion matrix, end-to-end latency" />
            <Info label="Reliability" value="Trust-level weighting based on lighting/visibility/sensor health" />
          </div>
        </section>
      </div>
    </main>
  )
}

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="info">
      <p className="info-label">{label}</p>
      <p>{value}</p>
    </div>
  )
}
