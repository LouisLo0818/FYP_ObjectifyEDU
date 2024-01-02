<template>
  <div class="container" style="margin-left: 10px;">
    <nav class="navbar">
      <div class="logo">
        <img src="path-to-your-logo.png" alt="webio logo" />
      </div>
      <div class="nav-title">Engagement & Nurture Marketing Str...</div>
      <div class="nav-icons">
        <button class="icon-button">
          <i class="icon-bell"></i> <!-- Replace with actual icon -->
        </button>
        <button class="icon-button">
          <i class="icon-settings"></i> <!-- Replace with actual icon -->
        </button>
        <button class="icon-button">
          <i class="icon-dots"></i> <!-- Replace with actual icon -->
        </button>
      </div>
      <div class="nav-action">
        <button class="action-button">Finish the lesson</button>
      </div>
    </nav>
    <video ref="videoElement" class="input_video"></video>
    <canvas ref="canvasElement" class="output_canvas" width="1000" height="500" style="border-radius: 20px;"></canvas>
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
        width: 1500,
        height: 1000
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
html,
body {
  background-color: #f5f5f9;
}

.input_video {
  display: none;
}

.navbar {
  display: flex;
  align-items: center;
  background-color: #f5f5f9;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 90%;
}

.logo img {
  height: 40px;
  /* Adjust size as needed */
}

.nav-title {
  flex-grow: 1;
  margin-left: 20px;
  font-weight: bold;
  /* Truncate long titles */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-icons {
  display: flex;
  align-items: center;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  /* Adjust size as needed */
}

.action-button {
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>
