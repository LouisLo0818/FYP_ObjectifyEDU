<template>
  <div class="container" style="padding: 10px 20px; margin: 0; max-width: 100vw; max-height: 100vh;">
    <div class="row">
      <div class="col-9">
        <nav class="navbar">
          <div class="logo">
            <img src="path-to-your-logo.png" alt="webio logo" />
          </div>
          <div class="nav-title">? + 5 = 10</div>
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
        <div class="progress">
          <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth + '%' }" aria-valuenow="100"
            aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <video ref="videoElement" class="input_video"></video>
        <canvas ref="canvasElement" class="output_canvas" width="1680" height="1050"></canvas>
        <h1>{{ totalFingerCount }}</h1>
        <h1>{{ handCount }}</h1>
      </div>
      <div class="col" style="margin: 20px;border-radius: 20px; border: 1px solid;max-height: 100%;height: 90vh;">asd
      </div>
    </div>
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
      progressBarWidth: 100,
      interval: null,
      answer: 5
    };
  },
  computed: {
    totalFingerCount() {
      return this.handsData.reduce((count, hand) => count + hand.fingerCount, 0);
    }
  },
  mounted() {
    this.initializeMediaPipe();
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    this.interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      this.progressBarWidth = 100 - (elapsedTime / duration) * 100;

      if (elapsedTime >= duration) {
        clearInterval(this.interval);
        this.progressBarWidth = 0;
        // show alert box
        if (this.totalFingerCount !== this.answer) {
          alert("Wrong! Your answer is " + this.totalFingerCount);
          window.location.reload();
        } else {
          alert("Correct! Your answer is " + this.totalFingerCount);
          window.location.reload();
        }
      }
    }, 1); // Update every 100ms for a smoother animation
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.interval);
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
        width: 1680,
        height: 1050
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
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 5 });
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

.output_canvas {
  border-radius: 20px;
  width: 100%;
  height: 70vh;
}

.navbar {
  display: flex;
  align-items: center;
  background-color: #f5f5f9;
  width: 100%;
  height: 80px;
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
  color: black;
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
  border-radius: 15px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  float: right;
}
</style>
