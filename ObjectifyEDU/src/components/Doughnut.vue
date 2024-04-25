<template>
  <div class="container">
    <div class="chart-container">
      <div style="position: absolute;font-size: 30px;">{{ hours }}H {{ minutes }}M</div>
      <Doughnut v-if="data" :data="data" :options="options" />
    </div>
    <div style="margin-top: 20px;">
      <div class="d-flex align-items-center mb-2">
        <div class="bullet-item me-2" style="background-color: #ffd786;"></div>
        <h6 class="fw-semibold flex-1 mb-0">Social - Emotional Development</h6>
        <h6 id="SE" class="fw-semibold mb-0" style="margin-left: auto;">{{ study_time[0] }}%</h6>
      </div>
      <div class="d-flex align-items-center mb-2">
        <div class="bullet-item me-2" style="background-color: #bcefa1;"></div>
        <h6 class="fw-semibold flex-1 mb-0">Founddations of mathematics</h6>
        <h6 id="Math" class="fw-semibold mb-0" style="margin-left: auto;">{{ study_time[1] }}%</h6>
      </div>
      <div class="d-flex align-items-center mb-2">
        <div class="bullet-item me-2" style="background-color: #87e2f5;"></div>
        <h6 class="fw-semibold flex-1 mb-0">Language</h6>
        <h6 id="Lan" class="fw-semibold mb-0" style="margin-left: auto;">{{ study_time[2] }}%</h6>
      </div>
      <div class="d-flex align-items-center mb-2">
        <div class="bullet-item me-2" style="background-color: #b8b9ff;"></div>
        <h6 class="fw-semibold flex-1 mb-0">Reaction</h6>
        <h6 id="Rec" class="fw-semibold mb-0" style="margin-left: auto;">{{ study_time[3] }}%</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";



ChartJS.register(ArcElement, Tooltip, Legend);
export default {
  name: "App",
  components: {
    Doughnut,
  },
  data() {
    return {
      study_time: [],
      hours: 0,
      minutes: 0,
      data: null,
      // data: {
      //   labels: ["Social - Emotional Development", "Reaction", "Language", "Founddations of mathematics"],
      //   datasets: [
      //     {
      //       backgroundColor: [
      //         "rgba(255, 215, 134, 1)",
      //         "rgba(184, 185, 255, 1)",
      //         "rgba(135, 226, 245, 1)",
      //         "rgba(188, 239, 161, 1)",
      //       ],
      //       // asign data value form the study_time
      //       data: [],
      //       // borderWidth: 0, // Set the bar width here
      //     },
      //   ],
      // },
      options: {
        // How to make the labels below the chart?

        // //responsive: true,
        // maintainAspectRatio: false,
        // cutout: 60,
        // how the display the labels below the chart and flex direction column
        plugins: {
          legend: {
            display: false,
            position: "bottom",
            labels: {
              usePointStyle: true,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: 120,
        radius: 100,
        spacing: 3
      },
      centerText: {
        display: true,
        text: "Total",
      },
      elements: {
        arc: {
          // Set the z-index here
          zIndex: 999, // Adjust this value as needed
        },
      },
    };
  },
  async mounted() {
    await this.LearningTime();
  },
  methods: {
    async LearningTime() {
      try {
        const stuid = localStorage.getItem("student_id");
        const token = localStorage.getItem("user");

        const stuidInput = {
          student_id: stuid,
        };

        const response = await fetch('/api/Account', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(stuidInput),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the student data");
        }

        const data = await response.json();
        console.log(data);

        const study_time = data.study_time;
        console.log(study_time);

        this.study_time = study_time.map(item => {
          // Convert each time entry to total hours
          return item.hours + (item.minutes / 60) + (item.seconds / 3600);
        });

        console.log(this.study_time);

        // sum of all the study time
        const total = this.study_time.reduce((acc, curr) => acc + curr, 0);
        console.log(total);

        this.hours = Math.floor(total);
        this.minutes = Math.round((total - this.hours) * 60);
        console.log(this.hours, this.minutes);

        // calculate the percentage of each subject
        const percentage = this.study_time.map(item => Math.round((item / total) * 100));
        console.log(percentage);

        this.study_time = percentage;

        // add the data to the chart
        this.data = {
          labels: ["Social - Emotional Development", "Founddations of mathematics", "Language", "Reaction"],
          datasets: [
            {
              backgroundColor: [
                "rgba(255, 215, 134, 1)",
                "rgba(188, 239, 161, 1)",
                "rgba(135, 226, 245, 1)",
                "rgba(184, 185, 255, 1)",
              ],
              // asign data value form the study_time
              data: this.study_time,
              // borderWidth: 0, // Set the bar width here
            },
          ],
        };

      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
* {
  font-family: "Jost", sans-serif;
  color: #6c757d;
}

.chart-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: -30px auto;
}

.chart-container {
  flex-direction: column;
}

.doughnut-container {
  display: flex;
  width: 160px;
  height: 160px;
  align-items: center;
  margin: 0 auto;
}

.learning-time {
  position: relative;
  right: 50%;
  transform: translateX(-50%);
  color: #dbdbeb;
  font-size: 20px;
  background-color: #1c1c1c;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.learning-subject {
  margin-left: 10%;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dbdbeb;
}

.learning-subject i {
  font-size: 30px;
}

.bullet-item {
  height: 0.5rem;
  width: 1rem;
  border-radius: 2px;
}
</style>
