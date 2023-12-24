<template>
    <div class="flex-container">
        <side />
        <div class="main">
            <navbar />
            <div class="Course-title-container">
                <h1 class="display-6">Games</h1>
                <router-link to="/courses" class="btn btn-primary float-right"
                    style="width: 100px; background-color: #5753ea;">
                    <i class='bx bx-arrow-back' style="vertical-align: middle; font-size: 20px;"></i>
                    <span style="vertical-align: middle; font-size: 20px;">Back</span>
                </router-link>
            </div>
            <div class="container course-container">
                <div class="row row-cols-1">
                    <router-link v-for="(id, index) in game_id" :to="`/Courses/Games/${course_id[0]}/${id}`"
                        style="text-decoration: none; color: inherit;">
                        <div class="col" style="padding-bottom: 30px;">
                            <div class="p-4 course-square">
                                <img src="../../src/assets/img/tragicomedy.png" class="course-logo" />
                                <h6 style="padding-top: 10px;">{{ gameName[index] }}</h6>
                                <div class="lesson-container" style="padding-top: 10px;">
                                    <div class="lesson-number">
                                        <i class="bx bx-book-open">&nbsp;</i>
                                        <span>10 Lessons</span>
                                    </div>
                                    <div class="lesson-time">
                                        <i class="bx bx-time">&nbsp;</i>
                                        <span>10 hours</span>
                                    </div>
                                </div>
                                <div class="progress-container">
                                    <div class="progress progress-height">
                                        <div id="SEDbar" class="progress-bar" role="progressbar" aria-label="Basic example"
                                            style="width: 30%; background-color: #ffab00" aria-valuenow="25"
                                            aria-valuemin="0" aria-valuemax="100"></div>
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
            game_id: [],
            gameName: [],
            course_id: [],
            course_img: [],
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
                // get jsonData course_id is "SE001" equal the URL :id
                const course_info = jsonData.filter((course) => course.course_id === this.$route.params.id);

                this.course_id = course_info.map((course) => course.course_id);
                // get the game object related the course_id
                const game = course_info[0].games;

                this.game_id = game.map((game) => game.game_id);
                this.gameName = game.map((game) => game.gameName);

                console.log(this.course_id);
                console.log(this.game_id);
                console.log(this.gameName);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
    }
};
</script>

<style>
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
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: 20px auto;
    margin-top: 40px;
}

.course-container {
    margin: 0 auto;
    max-width: 95%;
    padding: 0 0;
}
</style>