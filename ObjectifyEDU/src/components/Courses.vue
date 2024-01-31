<template>
  <div class="flex-container">
    <side />
    <div class="main">
      <navbar />
      <div class="Course-title-container">
        <h1 class="display-6">My Courses</h1>
      </div>
      <div class="container course-container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 g-lg-4">

          <router-link v-for="(id, index) in  course_id " :to="`/Courses/Games/${id}`"
            style="text-decoration: none; color: inherit;">
            <div class="col">
              <div class="p-4 course-square">
                <img :src="course_img[index]" class="course-logo" />
                <h6>{{ course_name[index] }}</h6>
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
                <div class="progress-container">
                  <div class="progress progress-height">
                    <div id="SEDbar" class="progress-bar" role="progressbar" aria-label="Basic example"
                      style="width: 0%; background-color: #ffab00" aria-valuenow="25" aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                  <span>{{ SEDbar }}</span>
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
      SEDbar: "",
      course_id: [],
      course_name: [],
      time: [],
      course_img: [],
      lessons: [],
    };
  },
  mounted() {
    // Get the element
    //const SEDbar = document.getElementById("SEDbar");
    //this.SEDbar = SEDbar.style.width;
    this.fetchCourseId();
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
        console.log(this.course_name);
        console.log(this.time);
        console.log(this.course_img);
        console.log(this.lessons);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  }
};
</script>

<style>
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
  height: 100%;
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
}

.progress-height {
  height: 0.5rem;
  width: 85%;
  background-color: #453c38;
  margin-right: 10px;
}
</style>
