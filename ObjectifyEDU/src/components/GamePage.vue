<template>
  <div class="container">
    <video ref="videoElement" class="input_video"></video>
    <canvas ref="canvasElement" class="output_canvas" width="500" height="500" style="border-radius: 30px;"></canvas>
    <h1>{{ totalFingerCount }}</h1>
    <h1>{{ handCount }}</h1>
  </div>
</template>

<script>
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

export default {
  data() {
    return {
      handsData: [],
      handCount: 0,
    };
  },
  computed: {
    totalFingerCount() {
      return this.handsData.reduce((count, hand) => count + hand.fingerCount, 0);
    }
  },
  mounted() {
    this.initializeMediaPipe();
  },
  methods: {
    initializeMediaPipe() {
      const videoElement = this.$refs.videoElement;
      const canvasElement = this.$refs.canvasElement;
      const canvasCtx = canvasElement.getContext('2d');

      const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        selfieMode: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      hands.onResults(this.onResults);

      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 500,
        height: 500
      });
      camera.start();
    },
    onResults(results) {
      const canvasElement = this.$refs.canvasElement;
      const canvasCtx = canvasElement.getContext('2d');

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      this.handCount = results.multiHandLandmarks.length || 0;
      this.handsData = results.multiHandLandmarks.map(landmarks => ({
        fingerCount: this.countFingers(landmarks),
        handType: this.determineHandType(landmarks),
      }));

      results.multiHandLandmarks.forEach(landmarks => {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
      });

      canvasCtx.restore();
    },
    countFingers(landmarks) {
      let fingerCount = 0;
      const isLeftHand = this.determineHandType(landmarks) === 'Left';

      // Thumb
      if ((isLeftHand && landmarks[4].x > landmarks[3].x) || (!isLeftHand && landmarks[4].x < landmarks[3].x)) {
        fingerCount += 1;
      }
      // Index Finger
      if (landmarks[8].y < landmarks[6].y) {
        fingerCount += 1;
      }
      // Middle Finger
      if (landmarks[12].y < landmarks[10].y) {
        fingerCount += 1;
      }
      // Ring Finger
      if (landmarks[16].y < landmarks[14].y) {
        fingerCount += 1;
      }
      // Pinky
      if (landmarks[20].y < landmarks[18].y) {
        fingerCount += 1;
      }
      return fingerCount;
    },
    determineHandType(landmarks) {
      return landmarks[0].x < landmarks[9].x ? 'Left' : 'Right';
    }
  }
};
</script>

<style>
.input_video {
  display: none;
}
</style>
