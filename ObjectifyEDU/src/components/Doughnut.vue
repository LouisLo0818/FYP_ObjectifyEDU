<template>
  <div class="doughnut-container">
    <Doughnut :data="data" :options="options" style="position: relative; z-index: 2" />
    <div class="learning-time">2h&nbsp35m</div>
  </div>
  <div class="container" style="margin-top: 20px">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4" style="height: 50px">
      <div class="col" style="display: flex; align-items: center">
        <div class="learning-subject" style="background-color: #453c38">
          <i class="bx bxs-happy-alt" style="color: #ffab00"></i>
        </div>
        <span style="margin-left: 10px; font-size: 20px">25%</span>
      </div>
      <div class="col" style="display: flex; align-items: center">
        <div class="learning-subject" style="background-color: #36483f">
          <i class="bx bx-math" style="color: #71dd37"></i>
        </div>
        <span style="margin-left: 10px; font-size: 20px">25%</span>
      </div>
      <div class="col" style="display: flex; align-items: center">
        <div class="learning-subject" style="background-color: #24445c">
          <i class="bx bxs-edit-alt" style="color: #04c3ec"></i>
        </div>
        <span style="margin-left: 10px; font-size: 20px">25%</span>
      </div>
      <div class="col" style="display: flex; align-items: center">
        <div class="learning-subject" style="background-color: #3c3c72">
          <i class='bx bx-run' style="color:#b8b9ff"></i>
        </div>
        <span style="margin-left: 10px; font-size: 20px">25%</span>
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
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        canvasWidth: 400, // Set the width of the canvas
        datasets: [
          {
            backgroundColor: [
              "rgba(255, 215, 134, 1)",
              "rgba(184, 185, 255, 1)",
              "rgba(135, 226, 245, 1)",
              "rgba(188, 239, 161, 1)",
            ],
            data: [40, 20, 80, 10],
            borderWidth: 0, // Set the bar width here
          },
        ],
      },
      options: {
        //responsive: true,
        maintainAspectRatio: false,
        cutout: 60,
        plugins: {
          legend: {
            display: false,
            position: "bottom",
          },
        },
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

<style>
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
</style>
