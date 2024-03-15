<template>
    <div id="app">
        <video id="myVideo" ref="video" width="720" height="560" autoplay muted></video>
        <canvas id="myCanvas" ref="canvas" width="720" height="560"></canvas>
    </div>
</template>

<script>
import * as faceapi from "face-api.js";
import * as canvas from 'canvas';

export default {
    name: 'FaceRecognition',
    async mounted() {
        await this.loadModels();
        this.startVideo();
    },
    methods: {
        async loadModels() {
            // Adjust the paths based on where you've stored the models
            const MODEL_URL = 'src\models';
            // const input = document.getElementById('myImg')
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
            ])
        },
        async startVideo() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                this.$refs.video.srcObject = stream;
                this.$refs.video.onloadedmetadata = () => {
                    this.detectEmotions();
                };
            } catch (error) {
                console.error('Error starting video stream:', error);
            }
        },
        async detectEmotions() {
            const videoEl = this.$refs.video;
            const canvas = this.$refs.canvas;
            const displaySize = { width: videoEl.width, height: videoEl.height };
            faceapi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }, 100);
        },
    },
};
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

canvas {
    position: absolute;
}
</style>