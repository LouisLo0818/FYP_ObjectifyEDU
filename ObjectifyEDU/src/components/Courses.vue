<template>
  <div class="flex-container">
    <side />
    <div class="main">
      <navbar />
      <div class="Course-title-container">
        <h1 style="margin: 0;">My Courses</h1>
      </div>
      <div class="container" style="margin: 0 auto; max-width: 95%; padding: 0 0">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          <router-link v-for="(id, index) in course_id " :to="`/Courses/Games/${id}`"
            style="text-decoration: none; color: inherit;">
            <div class="d-flex flex-column" style="margin: 0; padding: 0;">
              <div class="p-4 course-square">
                <div style="height: 70%;">
                  <img :src="course_img[index]" class="course-logo" />
                  <h6>{{ course_name[index] }}</h6>
                </div>
                <div>
                  <div class="lesson-container">
                    <div class="lesson-number">
                      <i class="bx bx-book-open">&nbsp;</i>
                      <span>{{ lessons[index] }} Lessons</span>
                    </div>
                    <div class="lesson-time">
                      <i class="bx bx-time">&nbsp;</i>
                      <span>{{ time[index] }} hours</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="progress-container">
                    <div class="progress progress-height">
                      <div id="SEDbar" class="progress-bar" role="progressbar" aria-label="Basic example"
                        :style="`width: ${SEDbar[index] * 2}%; background-color: #ffab00`" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span>{{ SEDbar[index] * 2 }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      SEDbar: [0, 0, 0, 0, 0, 0, 0, 0],
      course_id: {},
      course_name: [],
      time: [],
      course_img: [],
      lessons: [],
      hours: 0,
      minutes: 0,
      hours: 0,
      lastMouseLeaveTime: null, // Store the last mouse leave time
      dayOfWeek: new Date().getDay(),
    };
  },
  mounted() {
    this.fetchCourseId();
    this.trackStayDuration();

    const mainElement = document.querySelector('.container');
    if (mainElement) {
      mainElement.addEventListener('mouseleave', async () => {
        this.trackStayDuration();
        await this.updateActivityTime();
      });
    }
  },
  beforeDestroy() {
    if (mainElement) {
      mainElement.removeEventListener('mouseleave', async () => {
        this.trackStayDuration();
        await this.updateActivityTime();
      });
    }
  },
  methods: {
    async fetchCourseId() {
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

        this.course_id = jsonData.map(item => item.course_id);
        this.course_name = jsonData.map(item => item.course_name);
        this.time = jsonData.map(item => item.time);
        this.course_img = jsonData.map(item => item.course_img);
        this.lessons = jsonData.map(item => item.games.length);

        console.log(this.course_id);
        // console.log(this.course_name);
        // console.log(this.time);
        // console.log(this.course_img);
        // console.log(this.lessons);

        // --------------------------------------------- student table API --------------------------------------------- //

        const stuid = localStorage.getItem("student_id");

        const stuidInput = {
          student_id: stuid,
        };

        const studentResponse = await fetch("/api/Student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include the token in the Authorization header
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(stuidInput),
        });

        if (!studentResponse.ok) {
          throw new Error("Failed to fetch the student data");
        }

        const jsonData2 = await studentResponse.json();

        const courseInfo = jsonData2.map((item) => item.courses);
        const course_id = courseInfo[0].map(item => item.course_id);
        const gameInfo = courseInfo[0].map((item) => item.games);
        const game_id = gameInfo.map((item) => item.map((game) => game.game_id));
        const is_finish = gameInfo.map((item) => item.map((game) => game.questions.map((question) => question.is_correct).length));

        console.log(course_id);
        // console.log(gameInfo);
        // console.log(game_id);
        // console.log(is_finish);

        // Initialize this.SEDbar with zeros based on the length of this.course_id
        this.SEDbar = new Array(this.course_id.length).fill(0);

        // Iterate over each course_id and update this.SEDbar if a match is found in this.course_id
        course_id.forEach((id, index) => {
          const position = this.course_id.indexOf(id);
          if (position !== -1) {
            // Assign the is_finish value to the corresponding position in this.SEDbar
            // Assuming is_finish is a nested array where the outer array index corresponds to course_id
            // and the inner array holds the completion status for each game within that course
            this.SEDbar[position] = is_finish[index] ? is_finish[index][0] : 0;
          }
        });

        console.log(this.SEDbar);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    trackStayDuration() {
      const currentTime = new Date();
      if (this.lastMouseLeaveTime) {
        const duration = currentTime - this.lastMouseLeaveTime; // Duration in milliseconds
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;

        console.log(`Duration since last leave: ${this.hours} hours, ${this.minutes} minutes, ${this.seconds} seconds`);

        // Here you can call your updateActivityTime() method or any other logic
        // For demonstration, I'm just logging the duration
        // this.updateActivityTime(hours, minutes, seconds);
      }
      // Update lastMouseLeaveTime to current time
      this.lastMouseLeaveTime = currentTime;
    },
    async updateActivityTime() {
      try {
        const token = localStorage.getItem("user");
        const student_id = localStorage.getItem("student_id");

        const studentInput = {
          student_id: student_id,
          dayOfWeek: this.dayOfWeek,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds
        };

        console.log(studentInput);

        const response = await fetch("/api/updateActivityTime", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Include the token in the Authorization header
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentInput),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  beforeDestroy() {
    this.trackStayDuration();
  },
};
</script>

<style scoped>
* {
  font-family: "Jost", sans-serif;
  color: #6c757d;
}

html body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f5f5f9;
}

.flex-container {
  display: flex;
  height: 100%;
}

.main {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f9;
  color: #4c5f71;
  /* margin-left: 260px; */
  padding-left: 260px;
}

@media screen and (max-width: 1300px) {
  .main {
    padding-left: 0;
  }
}

.Course-title-container {
  display: flex;
  width: 95%;
  margin: 20px auto;
  margin-top: 40px;
}

.course-container {
  margin: 0 auto;
  max-width: 95%;
  padding: 0 0;
}

.course-square {
  height: 200px;
  border-radius: 8px;
  background-color: #ffffff;
  transition: box-shadow 0.3s;
  /* Add a transition for a smoother effect */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.course-square:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}

.course-logo {
  width: 50px;
  height: 50px;
  display: block;
  margin-bottom: 10px;
}

.lesson-container {
  display: flex;
  align-items: center;
  margin: 10px 0 12px 0;
}

.lesson-number {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #a7a7b8;
}

.lesson-time {
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #a7a7b8;
}

.progress-container {
  display: flex;
  align-items: center;
  margin-top: -5px;
}

.progress-height {
  height: 0.5rem;
  width: 85%;
  background-color: #453c38;
  margin-right: 10px;
}
</style>
