<template>
  <div class="gamePageContainer">
    <div class="container" style="height: 100%;">
      <div class="row justify-content-center" style="height: 100%;">
        <div class="col-8 me-4" style="display: flex; flex-direction: column; padding: 0; margin-right: 20px;">
          <div class="col" style="flex: 0;">
            <div class="question-content d-flex align-items-center justify-content-between">
              <!-- Logo -->
              <div class="logo d-flex align-items-center">
                <img src="../../src/assets/img/dog.png" alt="webio logo" style="height: 50px;">
                <!-- Adjust height as needed -->
              </div>

              <!-- Question Text -->
              <div class="nav-title flex-grow-1 mx-3">
                {{ questionText }}
              </div>

              <!-- Icons -->
              <div class="nav-icons d-flex align-items-center">
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

              <!-- Action Button -->
              <div class="nav-action">
                <button class="action-button" @click="finishLesson">Finish the lesson</button>
              </div>
            </div>
          </div>
          <div class="col" style="flex: 1;display: flex; flex-direction: column;">
            <div class="col" style="flex: 0;">
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth + '%' }"
                  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div class="col" style="flex: 1">
              <video ref="videoElement" class="input_video"></video>
              <canvas ref="canvasElement" class="output_canvas" :width="videoWidth" :height="videoHeight"></canvas>
            </div>
          </div>
          <div class="col" style="flex: 0;">
            <!-- <div class="answer-container" style="height: 100%;"> -->
            <!-- <div class="answer-container h-100">
              <button class="answer-button">A</button>
              <button class="answer-button">B</button>
              <br />
              <button class="answer-button">C</button>
              <button class="answer-button">D</button>
            </div> -->
            <div class="container overflow-hidden text-center"
              style="background-color: white;border-radius: 20px;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;">
              <div class="row g-2 row-cols-2">
                <div class="col">
                  <div class="p-2 border bg-light">Custom column padding</div>
                </div>
                <div class="col">
                  <div class="p-2 border bg-light">Custom column padding</div>
                </div>
                <div class="col">
                  <div class="p-2 border bg-light">Custom column padding</div>
                </div>
                <div class="col">
                  <div class="p-2 border bg-light">Custom column padding</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <h1>{{ totalFingerCount }}</h1>
          <h1>{{ handCount }}</h1> -->
        </div>
        <div class="col-3 course-content"
          style="display: flex; flex-direction: column;height:100%;background-color: #ffffff;">
          <div style="display: flex;justify-content: center;align-items: center;height: 10%;">
            <h4 style="margin: 0;">{{ gameName }}</h4>
          </div>
          <ul class="question-list">
            <li v-for="(question, index) in questions" :key="question.question_id" class="question-item"
              :class="{ 'clicked': clickedIndex === index }" @click="handleClick(question.question_id)">
              <span class="question-number fs-3">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</span>
                  <span class="question-text">{{ question.questionText }}</span>
            </li>
          </ul>
          <div class="next-previous-container">
            <div class="container overflow-hidden text-center" style="padding: 0 10px;">
              <div class="row g-2">
                <div class="col">
                  <div class="p-2 border bg-light" style="border-radius: 40px">Custom</div>
                </div>
                <div class="col">
                  <div class="p-2 border bg-light" style="border-radius: 40px">Custom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-3 course-content" style="display: flex; flex-direction: column;padding: 0;">
          <h5 style="padding: 10px 0 20px 0;">{{ gameName }}</h5>
          <ul class="question-list" style="height: 100%;overflow-y: scroll;flex: 1;">
            <li v-for="(question, index) in questions" :key="question.question_id" class="question-item"
              :class="{ 'clicked': clickedIndex === index }" @click="handleClick(question.question_id)">
              <span class="question-number fs-3">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</span>
                  <span class="question-text">{{ question.questionText }}</span>
            </li>
          </ul>
          <div class="col" style="flex: 0;">
            <div class="next-previous-container">
              <button class="action-button">Previous</button>
              <button class="action-button">Next</button>
            </div>
          </div>
        </div> -->
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
      questionText: '',
      // options: [],
      // correctOption: [],
      questions: [],
      clickedIndex: 0, // To store the index of the clicked question,
      videoWidth: 0,
      videoHeight: 0,
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
    // Call the method to set the initial size based on the current container width
    this.setCanvasSize();
    // Add event listener to call setCanvasSize on window resize
    window.addEventListener('resize', this.setCanvasSize);
    //  # this.setCanvasContainer();
    //  # window.addEventListener('resize', this.setCanvasContainer);
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
    window.removeEventListener('resize', this.setCanvasSize);
    //  # window.removeEventListener('resize', this.setCanvasContainer);
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
        width: screen.width,
        height: screen.height,
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
        // this.questionText = questionInfo.map((question) => question[0].questionText);
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
    handleClick(questionId) {
      console.log("Clicked question ID:", questionId);
      // You can also set the clickedIndex if you need to use it for other purposes
      this.clickedIndex = this.questions.findIndex(question => question.question_id === questionId);

      // If the question is found (clickedIndex is not -1)
      if (this.clickedIndex !== -1) {
        // Set the questionText from the clicked question
        this.questionText = this.questions[this.clickedIndex].questionText;
      }
    },

    //----------------------------------------------- For UI layout -----------------------------------------------//

    setCanvasSize() {
      const deivce_scale = window.devicePixelRatio // get the scale and layout from PC setting
      const screenWidth = screen.width * deivce_scale // actual screen size
      const screenHeight = screen.height * deivce_scale // actual screen size

      console.log(deivce_scale)
      const width = screen.width
      console.log(width)
      const height = screen.height
      console.log(height)
      this.videoWidth = width;
      this.videoHeight = height * 0.7;
    },
    //  # setCanvasContainer() {
    //   const deivce_scale = window.devicePixelRatio // get the scale and layout from PC setting
    //   const screenWidth = screen.width * deivce_scale // actual screen size
    //   const canvas_container = document.querySelector(".video-container");
    //   const userAgent = navigator.userAgent || navigator.vendor || window.opera; // get device is PC or iPad
    //   // For PC
    //   if (!/Macintosh|iPad|iPhone|iPod/.test(userAgent)) {
    //     if (screenWidth >= 1600) { // PC 1680 x 1050
    //       canvas_container.style.height = "60vh";
    //     }
    //   } else {
    //     console.log(this.screenWidth);
    //     if (screen.width >= 1300 && screen.width <= 1366) { // iPad Pro size 1366 x 1024
    //       canvas_container.style.height = "70vh";
    //     } else if (screen.width >= 1100 && screen.width <= 1180) { // iPad Air size 1180 x 820
    //       canvas_container.style.height = "65vh";
    //     } else if (screen.width >= 1000 && screen.width <= 1024) { // iPad mini size 1024 x 768
    //       canvas_container.style.height = "65vh";
    //     }
    //   }
    // }
  },

  //------------------------------------------------------------------------------------------------------------//

  // If your questions data comes from an asynchronous source (like an API), 
  // you can use a watcher to update questionText when questions changes:
  watch: {
    questions(newQuestions) {
      if (newQuestions.length > 0) {
        this.questionText = newQuestions[0].questionText;
      }
    }
  },
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
  overflow-y: hidden;
  /* Prevent scrolling on the whole page */
  background-color: #f5f5f9;
}

.container {
  max-height: 100%;
  max-width: 100%;
  padding: 20px 0px;
}

.input_video {
  display: none;
}

.output_canvas {
  border-radius: 20px;
  width: 100%;
  height: 97%;
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
  /* Truncate long titles */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  font-size: 20px;
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
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  height: 100%;
  padding: 0;
}

.question-list {
  list-style-type: none;
  padding-left: 0;
  overflow-y: scroll;
  flex: 1;
  scrollbar-width: none;
  padding: 0 20px;
}

.question-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 50px;
  transition: background-color 0.3s;
  /* Add border-radius to the transition */
  border-radius: 10px;
  /* Adjust the border-radius as needed */
  padding: 10px;
  overflow: hidden;
  /* Ensure the overflow content is hidden */
  position: relative;
  /* Needed for absolute positioning of the fade effect */
}

.question-text {
  white-space: nowrap;
  /* Prevent text from wrapping to the next line */
  overflow: hidden;
  /* Hide overflow text */
  text-overflow: ellipsis;
  /* Add an ellipsis to overflow text */
  display: block;
  /* Block display to fill the width */
  max-width: calc(100% - 30px);
  /* Adjust the width as needed, accounting for other elements like question-number */
}


.question-item:hover {
  background-color: #e0e0e0;
  /* Change to your desired hover background color */
}

.question-item.clicked {
  background-color: #e0e0e0;
  /* Background color for clicked item */
  pointer-events: none;
  /* Optional: disable further interactions */
}

.question-item::after {
  content: '';
  width: 30%;
  /* Cover the full width of the .question-item */
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 40%, rgb(255, 255, 255) 100%);
  /* Gradient fade effect */
}

.question-item.clicked::after {
  /* Only change what is different when clicked */
  background-color: #e0e0e0;
  width: 0%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 0%);
}

.question-number {
  margin-right: 20px;
  /* Space after the number */
}

.answer-container {
  /* display: flex; */
  justify-content: space-around;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
}

.answer-button {
  width: 20%;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 10px 30px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.answer-button:hover {
  background-color: #f0f0f0;
}

.answer-button.selected {
  background-color: #ffa500;
  color: white;
}

.next-previous-container {
  background-color: #c3c3c3;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
