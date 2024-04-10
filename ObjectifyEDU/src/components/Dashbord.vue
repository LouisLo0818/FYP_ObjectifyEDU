<template>
  <div class="flex-container">
    <side />
    <div class="main">
      <navbar />
      <div class="ability-title-container">
        <h1 style="margin: 0;">Process</h1>
      </div>
      <div class="container" style="margin: 0 auto; max-width: 95%; padding: 0 0">
        <div class="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-4">
          <div class="col">
            <div class="p-3"
              style="background-color: #ffffff; border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;">
              <div style="display: flex; align-items: center">
                <ul class="subject">
                  <li class="subject-title">Social - Emotional Development</li>
                  <li>
                    <h4 class="subject-grade" id="process1"></h4>
                  </li>
                </ul>
                <div class="subject-icon" style="background-color: #453c38">
                  <i class="bx bxs-happy-alt" style="color: #ffab00"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="p-3" style="
                background-color: #ffffff;
                border-radius: 8px;
                height: 100%;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
              ">
              <div style="display: flex; align-items: center; height: 100%">
                <ul class="subject">
                  <li class="subject-title">Founddations of mathematics</li>
                  <li>
                    <h4 class="subject-grade" id="process2"></h4>
                  </li>
                </ul>
                <div class="subject-icon" style="background-color: #36483f">
                  <i class="bx bx-math" style="color: #71dd37"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="p-3" style="
                background-color: #ffffff;
                border-radius: 8px;
                height: 100%;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
              ">
              <div style="display: flex; align-items: center; height: 100%">
                <ul class="subject">
                  <li class="subject-title">Language</li>
                  <li>
                    <h4 class="subject-grade" id="process3"></h4>
                  </li>
                </ul>
                <div class="subject-icon" style="background-color: #24445c">
                  <i class="bx bxs-edit-alt" style="color: #04c3ec"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="p-3" style="
                background-color: #ffffff;
                border-radius: 8px;
                height: 100%;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
              ">
              <div style="display: flex; align-items: center; height: 100%">
                <ul class="subject">
                  <li class="subject-title">Reaction</li>
                  <li>
                    <h4 class="subject-grade" id="process4"></h4>
                  </li>
                </ul>
                <div class="subject-icon" style="background-color: #3c3c72">
                  <i class="bx bx-run" style="color: #b8b9ff"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-1 mb-4 g-3 row-cols-1 row-cols-sm-1 row-cols-md-2">
          <div class="col">
            <div class="card h-100"
              style="border: none;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;">
              <h4 class="card-header" style="background: #ffffff;border-bottom: none;">Activity Time</h4>
              <div class="card-body">
                <LineChart />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100"
              style="border: none;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;">
              <h4 class="card-header" style="background: #ffffff;border-bottom: none;">Learning Time</h4>
              <div class="card-body" style="padding-top: 0%;">
                <Doughnut />
              </div>
            </div>
          </div>
          <div class="col" style="height: 15rem;">
            <div class="card h-100"
              style="border: none;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;">
              <h4 class="card-header" style="background: #ffffff;border-bottom: none;">Ranking</h4>
              <div class="ranking-container" style="overflow: scroll;scrollbar-width: none;">
                <table class="table table-hover">
                  <tbody>
                    <tr v-for="(name, index) in userName" :key="index">
                      <th scope="row" style="color: #4c5f71;">{{ index + 1 }}</th>
                      <td style="color: #4c5f71;">{{ name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col" style="height: 15rem;">
            <div class="card h-100"
              style="border: none;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;">
              <h4 class="card-header" style="background: #ffffff;border-bottom: none;">Awards</h4>
              <div class="card-body text-center" style="margin: auto auto;">
                <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                  <div class="col img-container">
                    <span class="tooltiptext">Exceptional Academic Excellence</span>
                    <img src="../../src/assets/img/gold_coin.png" style="height: 70px; width: 70px;" />
                  </div>
                  <div class="col img-container">
                    <span class="tooltiptext">Excellent Academic Performance</span>
                    <img src="../../src/assets/img/silver_coin.png" style="height: 70px; width: 70px;" />
                  </div>
                  <div class="col img-container">
                    <span class="tooltiptext">Effort and Participation</span>
                    <img src="../../src/assets/img/copper_coin.png" style="height: 70px; width: 70px;" />
                  </div>
                  <div class="col img-container">
                    <span class="tooltiptext">Perfect Attendance</span>
                    <img src="../../src/assets/img/calendar.png" style="height: 70px; width: 70px;" />
                  </div>
                  <div class="col img-container">
                    <span class="tooltiptext">Highest Scorer</span>
                    <img src="../../src/assets/img/gold_medal.png" style="height: 70px; width: 70px;" />
                  </div>
                  <div class="col img-container">
                    <span class="tooltiptext">Master of Challenges</span>
                    <img src="../../src/assets/img/trophy.png" style="height: 70px; width: 70px;" />
                  </div>
                  <div class="col img-container">
                    <span class="tooltiptext">Creative Excellence</span>
                    <img src="../../src/assets/img/gold_star.png" style="height: 70px; width: 70px;" />
                  </div>
                  <div class="col img-container">
                    <span class="tooltiptext">Innovative Thinking</span>
                    <img src="../../src/assets/img/silver_star.png" style="height: 70px; width: 70px;" />
                  </div>
                  <div class="col img-container">
                    <span class="tooltiptext">Original Contributions</span>
                    <img src="../../src/assets/img/copper_star.png" style="height: 70px; width: 70px;" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Doughnut from "@/components/Doughnut.vue";
import LineChart from "@/components/LineChart.vue";

export default {
  name: "App",
  components: {
    LineChart,
    Doughnut,
  },
  data() {
    return {
      userName: [],
      performance: [],
    };
  },
  mounted() {
    // this.fetchData();
    this.fetchRanking();
    this.CalculatePerformance();
  },
  methods: {
    async fetchRanking() {
      try {
        const token = localStorage.getItem("user");
        const class_name = localStorage.getItem("class_name");

        const classInput = {
          class_name: class_name,
        };

        console.log(classInput);

        const response = await fetch("/api/Class", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include the token in the Authorization header
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(classInput),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();

        this.userName = jsonData.map((item) => item.username);
        console.log(this.userName);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async CalculatePerformance() {
      const stuid = localStorage.getItem("student_id");
      const token = localStorage.getItem("user");

      const stuidInput = {
        student_id: stuid,
      };

      try {
        const studentResponse = await fetch("/api/Student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(stuidInput),
        });

        if (!studentResponse.ok) {
          throw new Error("Failed to fetch the student data");
        }

        const studentData = await studentResponse.json();
        const courses = studentData[0].courses;

        // Function to calculate performance metrics
        const calculateMetrics = (courseList) => {
          let totalQuestions = 0;
          let totalCorrect = 0;

          courseList.forEach(course => {
            course.games.forEach(game => {
              game.questions.forEach(question => {
                totalQuestions += 1;
                if (question.is_correct) {
                  totalCorrect += 1;
                }
              });
            });
          });

          const winRate = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 'N/A';

          return {
            totalQuestions,
            totalCorrect,
            winRate
          };
        };

        // Calculate performance metrics for each category
        const socialMetrics = calculateMetrics(courses.filter(course => ["SE001", "SE002"].includes(course.course_id)));
        const mathMetrics = calculateMetrics(courses.filter(course => ["Math001", "Math002"].includes(course.course_id)));
        const languageMetrics = calculateMetrics(courses.filter(course => ["Lan001", "Lan002"].includes(course.course_id)));
        const reactionMetrics = calculateMetrics(courses.filter(course => ["Re001", "Re002"].includes(course.course_id)));

        this.performance = [socialMetrics.winRate, mathMetrics.winRate, languageMetrics.winRate, reactionMetrics.winRate];

        for (let i = 0; i < this.performance.length; i++) {
          const process = document.getElementById(`process${i + 1}`);
          //if the process is good, set the color to green
          if (this.performance[i] >= 70) {
            process.innerHTML = "Good";
            process.style.color = "#71dd37";
          }
          //if the process is normal, set the color to yellow
          else if (this.performance[i] >= 50) {
            process.innerHTML = "Normal";
            process.style.color = "#ffab00";
          }
          //if the process is bad, set the color to red
          else if (this.performance[i] >= 25) {
            process.innerHTML = "Bad";
            process.style.color = "#ffaec8";
          }
          else {
            process.innerHTML = "Poor";
            process.style.color = "#ff0000";
          }
        }

        console.log('Social Total Win Rate:', socialMetrics.winRate);
        console.log('Math Total Win Rate:', mathMetrics.winRate);
        console.log('Language Total Win Rate:', languageMetrics.winRate);
        console.log('Reaction Total Win Rate:', reactionMetrics.winRate);
      } catch (error) {
        console.error("Error calculating performance:", error);
      }
    },
    // async fetchData() {
    //   try {
    //     const stuid = localStorage.getItem("student_id");
    //     const token = localStorage.getItem("user");
    //     const class_name = localStorage.getItem("class_name");

    //     const stuidInput = {
    //       stuid: stuid,
    //     };

    //     console.log(stuidInput);

    //     const response = await fetch("/api/Process", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         // Include the token in the Authorization header
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify(stuidInput),
    //     });

    //     if (!response.ok) {
    //       throw new Error("Failed to fetch data");
    //     }

    //     const jsonData = await response.json();

    //     var lis = [
    //       jsonData.Social,
    //       jsonData.Math,
    //       jsonData.Language,
    //       jsonData.Reaction,
    //     ];

    //     this.process = [];

    //     for (let i = 0; i < lis.length; i++) {
    //       switch (lis[i]) {
    //         case 1:
    //           this.process[i] = "Poor";
    //           break;
    //         case 2:
    //           this.process[i] = "Bad";
    //           break;
    //         case 3:
    //           this.process[i] = "Normal";
    //           break;
    //         case 4:
    //           this.process[i] = "Good";
    //           break;
    //         default:
    //           break;
    //       }
    //     }

    //     var processList = ["process1", "process2", "process3", "process4"];

    //     for (let i = 0; i < processList.length; i++) {
    //       const process = document.getElementById(processList[i]);
    //       process.innerHTML = this.process[i];
    //       //if the process is good, set the color to green
    //       if (this.process[i] == "Good") {
    //         process.style.color = "#71dd37";
    //       }
    //       //if the process is normal, set the color to yellow
    //       else if (this.process[i] == "Normal") {
    //         process.style.color = "#ffab00";
    //       }
    //       //if the process is bad, set the color to red
    //       else if (this.process[i] == "Bad") {
    //         process.style.color = "#ff0000";
    //       }
    //       //if the process is poor, set the color to red
    //       else if (this.process[i] == "Poor") {
    //         process.style.color = "#ff0000";
    //       }
    //     }

    //     console.log(this.process);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
  },
};
</script>

<style scoped>
* {
  font-family: "Jost", sans-serif;
  color: #6c757d;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f5f5f9;
  /* Define a default font family */
}

/* Utility classes */
.flex-container {
  display: flex;
  height: 100%;
}

.chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  max-width: 89%;
  margin: 0 auto;
}

.card-shadow {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

/* Main content area */
.main {
  width: 100%;
  height: 100%;
  background-color: #f5f5f9;
  padding-left: 260px;
  /* Removed the commented code */
}

/* Responsive design adjustments */
@media screen and (max-width: 1300px) {
  .main {
    padding-left: 0;
  }
}

/* Title containers */
.ability-title-container {
  display: flex;
  width: 95%;
  margin: 20px auto;
  margin-top: 40px;
}

/* Subject styling */
.subject {
  list-style: none;
  margin: auto 0;
  padding: 0;
}

.subject-icon {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.subject-icon i {
  font-size: 30px;
  /* Changed 'font' to 'font-size' for clarity */
}

.subject-title {
  font-size: 14px;
}

.subject-grade {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

/* Ranking table styles */
.ranking-container {
  width: 93%;
  margin: 10px auto;
}

.img-container {
  position: relative;
  display: inline-block;
}

.img-container .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px; /* Use half of the width value to align tooltip */
  opacity: 0;
  transition: opacity 0.6s;
}

.img-container:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

img {
  opacity: 0.3;
}
</style>
