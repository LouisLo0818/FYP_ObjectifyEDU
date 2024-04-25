<template>
    <Line v-if="chartConfig && chartConfig.data" :data="chartConfig.data" :options="chartConfig.options" />
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
            activityTime: [0, 0, 0, 0, 0, 0, 0],
            chartConfig: null
            // chartConfig: {
            //     data: {
            //         labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            //         datasets: [
            //             {
            //                 label: 'Activity Time ( Hours )',
            //                 data: [],
            //                 tension: 0.3,
            //                 borderColor: 'rgb(75, 192, 192)'
            //             }
            //         ]
            //     },
            //     tension: 1,
            //     options: {
            //         responsive: true,
            //         maintainAspectRatio: false
            //     }
            // }
        }
    },
    mounted() {
        this.ActivityTime();
    },
    methods: {
        async ActivityTime() {
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

                const activityTime = data.activity_time;
                console.log(activityTime);

                this.activityTime = activityTime.map(item => {
                    // Convert each time entry to total hours
                    return item.hours + (item.minutes / 60) + (item.seconds / 3600);
                });

                console.log(this.activityTime);

                this.chartConfig = {
                    data: {
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                        datasets: [
                            {
                                label: 'Activity Time ( Hours )',
                                data: this.activityTime,
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

                

                // this.chartConfig.data.datasets[0].data = this.activityTime;
                // console.log(this.chartConfig.data.datasets[0].data);

            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style scoped></style>