<template>
  <div class="container">
    <video ref="videoElement" class="input_video"></video>
    <canvas ref="canvasElement" class="output_canvas" width="1200" height="750" style="border-radius: 30px;"></canvas>
    <h1>{{ fingerCount }}</h1>
    <h1>{{ handcount }}</h1>
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
      handLandmarks: [],
      handIndex: "",
      Left: { f1: false, f2: false, f3: false, f4: false, f5: false },
      Right: { f1: false, f2: false, f3: false, f4: false, f5: false },
      handcount: 0,
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
        // all data init
        this.fingerCount = 0;
        this.handLandmarks = [];
        this.handIndex = "";
        this.Left = { f1: false, f2: false, f3: false, f4: false, f5: false };
        this.Right = { f1: false, f2: false, f3: false, f4: false, f5: false };
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
          results.image, 0, 0, canvasElement.width, canvasElement.height);
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          this.handcount = results.multiHandLandmarks.length
          for (const landmarks of results.multiHandLandmarks) {
            // classification is right hand or left hand
            this.handIndex = landmarks[0].x < landmarks[9].x ? "Left" : "Right";

            // if no hand showed, init the fingercount to 0
            //this.handcount = landmarks.length;

            console.log(this.handIndex);
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
              { color: '#00FF00', lineWidth: 5 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });

            // handLandmarks append lamarks x and y
            this.handLandmarks = landmarks.map((landmark) => {
              return [landmark.x, landmark.y];
            });

            // calculate finger count

            if (this.handIndex === "Left") {
              if (this.handLandmarks[4][0] > this.handLandmarks[3][0] && !this.Left.f1) {
                this.fingerCount += 1;
                this.Left.f1 = true;
              }
              if (this.handLandmarks[8][1] < this.handLandmarks[6][1] && !this.Left.f2) {
                this.fingerCount += 1;
                this.Left.f2 = true;
              }
              if (this.handLandmarks[12][1] < this.handLandmarks[10][1] && !this.Left.f3) {
                this.fingerCount += 1;
                this.Left.f3 = true;
              }
              if (this.handLandmarks[16][1] < this.handLandmarks[14][1] && !this.Left.f4) {
                this.fingerCount += 1;
                this.Left.f4 = true;
              }
              if (this.handLandmarks[20][1] < this.handLandmarks[18][1] && !this.Left.f5) {
                this.fingerCount += 1;
                this.Left.f5 = true;
              }
            } else if (this.handIndex === "Right") {
              if (this.handLandmarks[4][0] < this.handLandmarks[3][0] && !this.Right.f1) {
                this.fingerCount += 1;
                this.Right.f1 = true;
              }
              if (this.handLandmarks[8][1] < this.handLandmarks[6][1] && !this.Right.f2) {
                this.fingerCount += 1;
                this.Right.f2 = true;
              }
              if (this.handLandmarks[12][1] < this.handLandmarks[10][1] && !this.Right.f3) {
                this.fingerCount += 1;
                this.Right.f3 = true;
              }
              if (this.handLandmarks[16][1] < this.handLandmarks[14][1] && !this.Right.f4) {
                this.fingerCount += 1;
                this.Right.f4 = true;
              }
              if (this.handLandmarks[20][1] < this.handLandmarks[18][1] && !this.Right.f5) {
                this.fingerCount += 1;
                this.Right.f5 = true;
              }
            }
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
      this.fingerCount = extendedFingers;
    },
  },
};
</script>

<style>
.input_video {
  display: none;
}
</style>