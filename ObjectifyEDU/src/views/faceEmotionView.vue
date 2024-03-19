<template>
    <div class="video-container">
      <!-- Hide the video element but keep it in the DOM for capturing video stream -->
      <video ref="videoElement" autoplay muted style="display: none;"></video>
      <canvas ref="canvasElement"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import * as faceapi from 'face-api.js';
  
  export default {
    setup() {
      const videoElement = ref(null);
      const canvasElement = ref(null);
  
      async function loadModels() {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      }
  
      async function startVideo() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
          videoElement.value.srcObject = stream;
          videoElement.value.onloadedmetadata = () => {
            videoElement.value.play();
            detectEmotions();
          };
        } catch (error) {
          console.error('Error starting video stream:', error);
        }
      }
  
      async function detectEmotions() {
        // Wait until the video element has dimensions
        await new Promise(resolve => {
          if (videoElement.value.videoWidth > 0) {
            resolve();
          } else {
            videoElement.value.onloadedmetadata = () => resolve();
          }
        });
  
        const displaySize = { width: videoElement.value.videoWidth, height: videoElement.value.videoHeight };
        faceapi.matchDimensions(canvasElement.value, displaySize);
  
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(videoElement.value, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvasElement.value.getContext('2d').clearRect(0, 0, canvasElement.value.width, canvasElement.value.height);
          // Optionally, draw the video frame to the canvas
          canvasElement.value.getContext('2d').drawImage(videoElement.value, 0, 0, displaySize.width, displaySize.height);
          faceapi.draw.drawDetections(canvasElement.value, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasElement.value, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvasElement.value, resizedDetections);
        }, 100);
      }
  
      onMounted(async () => {
        await loadModels();
        startVideo();
      });
  
      return {
        videoElement,
        canvasElement
      };
    }
  };
  </script>
  
  <style scoped>
  .video-container {
    position: relative;
    width: 720px;
    height: 560px;
  }
  
  video, canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  </style>
  