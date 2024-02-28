<template>
    <div class="flex-container">
        <side />
        <div class="main">
            <navbar />
            <div class="Course-title-container">
                <div class="d-flex flex-row" style="width: 100%;">
                    <div class="me-auto">
                        <h1 style="margin: 0;">Games</h1>
                    </div>
                    <div class="p-1">
                        <router-link to="/courses" class="btn btn-primary float-right"
                            style="width: 100px; background-color: #5753ea;">
                            <i class='bx bx-arrow-back' style="vertical-align: middle; font-size: 20px;"></i>
                            <span style="vertical-align: middle; font-size: 20px;">Back</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="container course-container">
                <div class="row row-cols-1" style="margin: 0; padding: 0">
                    <router-link v-for="(id, index) in game_id" :to="`/Courses/Games/${course_id[0]}/${id}`"
                        style="text-decoration: none; color: inherit;padding: 0;">
                        <div class="d-flex flex-column mb-3" style="margin: 0; padding: 0">
                            <div class="p-4 course-square">
                                <div style="height: 50%;">
                                    <img src="../../src/assets/img/tragicomedy.png" class="course-logo" />
                                    <h6>{{ gameName[index] }}</h6>
                                </div>
                                <div style="height: 30%;">
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
                                </div>
                                <div>
                                    <div class="progress-container">
                                        <div class="progress progress-height">
                                            <div id="SEDbar" class="progress-bar" role="progressbar"
                                                aria-label="Basic example" style="width: 30%; background-color: #ffab00"
                                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <span>{{ SEDbar }}</span>
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

<style scoped>

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

.course-square {
    height: auto;
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