<template>
  <div class="container">
    <video ref="videoElement" class="input_video"></video>
    <canvas ref="canvasElement" class="output_canvas" width="1200" height="750" style="border-radius: 30px;"></canvas>
    <h1>{{ fingerCount }}</h1>
  </div>
</template>


<script>
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

export default {
  data() {
    return {
      fingerCount: 0,
    };
  },
  mounted() {
    this.initializeMediaPipe();
  },
  methods: {
    initializeMediaPipe() {
      const videoElement = this.$refs.videoElement;
      const canvasElement = this.$refs.canvasElement;
      const canvasCtx = canvasElement.getContext('2d');

      function onResults(results) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
          results.image, 0, 0, canvasElement.width, canvasElement.height);
        if (results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
              { color: '#00FF00', lineWidth: 5 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
            this.fingerCount = results.multiHandLandmarks.length
          }
        }
        canvasCtx.restore();
      }

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
      hands.onResults(onResults.bind(this));

      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 1200,
        height: 750
      });
      camera.start();
    },
    calculateFingerCount(landmarks) {
      // Implement your finger count calculation logic here
      // This is just a simple example, adjust it based on your requirements
      const extendedFingers = landmarks.filter((landmark) => landmark[1] < landmark[7][1]);
      return extendedFingers.length;
    },
  },
};
</script>

<style>
.input_video {
  display: none;
}
</style>