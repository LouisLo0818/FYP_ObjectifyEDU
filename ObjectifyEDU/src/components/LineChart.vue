<template>
    <Line :data="chartConfig.data" :options="chartConfig.options"/>
</template>
  
<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
} from "chart.js";
import { Line } from "vue-chartjs";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

export default {
    name: 'LineChart',
    components: {
        Line
    },
    data() {
        return {
            chartConfig: {
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Activity Time ( Hours )',
                            data: [40, 39, 10, 40, 39, 80, 40],
                            tension: 0.3,
                            borderColor: 'rgb(75, 192, 192)'
                        }
                    ]
                },
                tension: 1,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        }
    }
}
</script>
  
<style scoped>
</style>
  