<template>
  <div class="gamePageContainer">
    <div class="container" style="height: 100%;">
      <div class="row" style="padding: 1% 1% 1% 1%;height: 100%;">
        <div class="col-9" style="padding: 0;">
          <nav class="navbar">
            <div class="logo">
              <img src="../../src/assets/img/dog.png" alt="webio logo" />
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
              <button class="action-button" @click="finishLesson">Finish the lesson</button>
            </div>
          </nav>
          <div class="progress">
            <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth + '%' }" aria-valuenow="100"
              aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <video ref="videoElement" class="input_video"></video>
          <canvas ref="canvasElement" class="output_canvas" width="1920" height="1080"></canvas>
          <h1>{{ totalFingerCount }}</h1>
          <h1>{{ handCount }}</h1>
        </div>
        <div class="col course-content">
          <h5 style="padding: 10px 0 20px 0;">{{ gameName }}</h5>
          <ul class="question-list">
            <li v-for="(question, index) in questions" :key="question.question_id" class="question-item">
              <span class="question-number">0{{ index + 1 }}</span>
              <span class="question-text">{{ question.questionText }}</span>
            </li>
          </ul>
        </div>
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
      answer: 5,
      game_id: [],
      gameName: [],
      // question_id: [],
      // questionText: [],
      // options: [],
      // correctOption: [],
      questions: []
    };
  },
  computed: {
    totalFingerCount() {
      return this.handsData.reduce((count, hand) => count + hand.fingerCount, 0);
    }
  },
  mounted() {
    this.initializeMediaPipe();
    this.fetchGameInfo();
    // const startTime = Date.now();
    // const duration = 5000; // 5 seconds

    // this.interval = setInterval(() => {
    //   const elapsedTime = Date.now() - startTime;
    //   this.progressBarWidth = 100 - (elapsedTime / duration) * 100;

    //   if (elapsedTime >= duration) {
    //     clearInterval(this.interval);
    //     this.progressBarWidth = 0;
    //     // show alert box
    //     if (this.totalFingerCount !== this.answer) {
    //       alert("Wrong! Your answer is " + this.totalFingerCount);
    //       window.location.reload();
    //     } else {
    //       alert("Correct! Your answer is " + this.totalFingerCount);
    //       window.location.reload();
    //     }
    //   }
    // }, 1); // Update every 100ms for a smoother animation
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
    },
    finishLesson() {
      // Stop the camera stream
      if (this.$refs.videoElement && this.$refs.videoElement.srcObject) {
        const stream = this.$refs.videoElement.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => {
          track.stop();
        });

        // Reset the video element's source object
        this.$refs.videoElement.srcObject = null;
      }

      // Navigate to the previous page
      this.$router.go(-1);
    },
    async fetchGameInfo() {
      try {
        const token = localStorage.getItem("user");
        const response = await fetch("/api/Courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include the token in the Authorization header
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();

        const courseId = this.$route.params.id; // Adjust the param key based on your route setup
        const courseInfo = jsonData.find(course => course.course_id === courseId);

        if (!courseInfo) {
          console.error("Course not found");
          return;
        }

        // Now filter the games array within the course
        const gameInfo = courseInfo.games.find(game => game.game_id === this.$route.params.gameId);

        if (!gameInfo) {
          console.error("Game not found");
          return;
        }

        this.game_id = gameInfo.game_id;
        this.gameName = gameInfo.gameName;
        this.questions = gameInfo.questions;

        // this.question_id = questionInfo.map((question) => question.question_id);
        // this.questionText = questionInfo.map((question) => question.questionText);
        // this.options = questionInfo.map((question) => question.options);
        // this.correctOption = questionInfo.map((question) => question.correctOption);

        // console.log(this.question_id);
        // console.log(this.questionText);
        // console.log(this.options);
        // console.log(this.correctOption);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.gamePageContainer {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  /* Prevent scrolling on the whole page */
  background-color: #f5f5f9;
}

.container {
  max-height: 100%;
  max-width: 100%;
  padding: 20px 20px;
}

.input_video {
  display: none;
}

.output_canvas {
  border-radius: 20px;
  width: 100%;
  height: 65vh;
}

.navbar {
  display: flex;
  align-self: flex-start;
  background-color: #f5f5f9;
  width: 100%;
  padding: 0;
}

.logo img {
  height: 50px;
  /* Adjust size as needed */
}

.logo {
  display: flex;
  align-self: flex-start;
}

.nav-action {
  display: flex;
  align-self: flex-start;
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
  background-color: #5753ea;
  border: none;
  padding: 10px 10px;
  border-radius: 15px;
  color: white;
  font-size: 15px;
  cursor: pointer;
  float: right;
  width: 170px;
  height: 50px;
}

.progress {
  margin-top: 20px;
}

.course-content {
  background-color: #ffffff;
  border-radius: 20px;
  max-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  padding: 20px;
  margin: 0 0 0 20px;
}

.question-list {
  list-style-type: none;
  padding-left: 0;
}

.question-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 40px;
  transition: background-color 0.3s;
  /* Add border-radius to the transition */
  border-radius: 10px;
  /* Adjust the border-radius as needed */
}

.question-item:hover {
  background-color: #e0e0e0;
  /* Change to your desired hover background color */
}

.question-number {
  font-weight: bold;
  margin-right: 10px;
  /* Space after the number */
}
</style>
