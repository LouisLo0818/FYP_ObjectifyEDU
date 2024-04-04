<template>
  <div class="container">
    <div class="chart-container">
      <div style="position: absolute;font-size: 30px;">2H 35M</div>
      <Doughnut :data="data" :options="options" />
    </div>
    <div style="margin-top: 20px;">
      <div class="d-flex align-items-center mb-2">
        <div class="bullet-item me-2" style="background-color: #ffd786;"></div>
        <h6 class="fw-semibold flex-1 mb-0">Social - Emotional Development</h6>
        <h6 class="fw-semibold mb-0" style="margin-left: auto;">40%</h6>
      </div>
      <div class="d-flex align-items-center mb-2">
        <div class="bullet-item me-2" style="background-color: #bcefa1;"></div>
        <h6 class="fw-semibold flex-1 mb-0">Founddations of mathematics</h6>
        <h6 class="fw-semibold mb-0" style="margin-left: auto;">20%</h6>
      </div>
      <div class="d-flex align-items-center mb-2">
        <div class="bullet-item me-2" style="background-color: #87e2f5;"></div>
        <h6 class="fw-semibold flex-1 mb-0">Language</h6>
        <h6 class="fw-semibold mb-0" style="margin-left: auto;">20%</h6>
      </div>
      <div class="d-flex align-items-center mb-2">
        <div class="bullet-item me-2" style="background-color: #b8b9ff;"></div>
        <h6 class="fw-semibold flex-1 mb-0">Reaction</h6>
        <h6 class="fw-semibold mb-0" style="margin-left: auto;">20%</h6>
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
      data: {
        labels: ["Social - Emotional Development", "Reaction", "Language", "Founddations of mathematics"],
        datasets: [
          {
            backgroundColor: [
              "rgba(255, 215, 134, 1)",
              "rgba(184, 185, 255, 1)",
              "rgba(135, 226, 245, 1)",
              "rgba(188, 239, 161, 1)",
            ],
            data: [40, 20, 20, 20],
            // borderWidth: 0, // Set the bar width here
          },
        ],
      },
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
