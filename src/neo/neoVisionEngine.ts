import { FilesetResolver, HandLandmarker, PoseLandmarker } from '@mediapipe/tasks-vision';
import type { NeoFrame } from './neoTypes';

const VISION_WASM_URL =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm';
const HAND_TASK_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const POSE_TASK_URL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task';

type FrameListener = (frame: NeoFrame) => void;

function normalizeHandedness(value: string | undefined): 'left' | 'right' | null {
  const v = value?.toLowerCase();
  if (v === 'left') return 'left';
  if (v === 'right') return 'right';
  return null;
}

export class NeoVisionEngine {
  private hand: HandLandmarker | null = null;
  private pose: PoseLandmarker | null = null;
  private stream: MediaStream | null = null;
  private raf = 0;
  private video: HTMLVideoElement | null = null;
  private listener: FrameListener | null = null;
  private running = false;
  private lastTs = -1;

  async start(video: HTMLVideoElement, listener: FrameListener): Promise<void> {
    if (this.running) return;
    this.video = video;
    this.listener = listener;

    const vision = await FilesetResolver.forVisionTasks(VISION_WASM_URL);

    this.hand = await HandLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: HAND_TASK_URL },
      runningMode: 'VIDEO',
      numHands: 2,
      minHandDetectionConfidence: 0.55,
      minHandPresenceConfidence: 0.55,
      minTrackingConfidence: 0.55,
    });

    this.pose = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: POSE_TASK_URL },
      runningMode: 'VIDEO',
      numPoses: 1,
      minPoseDetectionConfidence: 0.45,
      minPosePresenceConfidence: 0.45,
      minTrackingConfidence: 0.45,
    });

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    });

    video.srcObject = this.stream;
    video.muted = true;
    video.playsInline = true;
    await video.play();

    this.running = true;
    this.lastTs = -1;
    this.loop();
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    if (this.video) this.video.srcObject = null;
    this.hand?.close();
    this.pose?.close();
    this.hand = null;
    this.pose = null;
    this.listener = null;
    this.video = null;
    this.lastTs = -1;
  }

  private loop = (): void => {
    if (!this.running) return;

    const video = this.video;
    const hand = this.hand;
    const pose = this.pose;

    if (!video || !hand || !pose || video.readyState < 2) {
      this.raf = requestAnimationFrame(this.loop);
      return;
    }

    const timestamp = Math.max(Math.round(performance.now()), this.lastTs + 1);
    this.lastTs = timestamp;

    const handResult = hand.detectForVideo(video, timestamp);
    const poseResult = pose.detectForVideo(video, timestamp);

    const handSlots: [
      readonly { x: number; y: number; z: number }[],
      readonly { x: number; y: number; z: number }[],
    ] = [[], []];

    const handedness: Array<'left' | 'right'> = [];

    for (let i = 0; i < handResult.landmarks.length; i += 1) {
      const points = handResult.landmarks[i]?.map((p) => ({ x: p.x, y: p.y, z: p.z })) ?? [];
      const label = normalizeHandedness(handResult.handedness[i]?.[0]?.categoryName);
      if (!label) continue;
      handedness.push(label);
      handSlots[label === 'left' ? 0 : 1] = points;
    }

    const primary =
      handSlots[0].length === 21
        ? 'left'
        : handSlots[1].length === 21
          ? 'right'
          : null;

    const posePoints =
      poseResult.landmarks[0]?.map((p) => ({ x: p.x, y: p.y, z: p.z })) ?? [];

    this.listener?.({
      timestamp,
      handsDetected: handResult.landmarks.length,
      primaryHand: primary,
      landmarks: primary === 'left'
        ? handSlots[0]
        : primary === 'right'
          ? handSlots[1]
          : null,
      handSlots,
      pose: posePoints,
      handedness,
    });

    this.raf = requestAnimationFrame(this.loop);
  };
}
