<script setup>
import Button from 'primevue/button';
</script>

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
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 g-lg-4">
                    <router-link to="/Courses/Games" style="text-decoration: none; color: inherit;">
                        <div class="col">
                            <div class="p-4 course-square">
                                <img src="src/assets/img/tragicomedy.png" class="course-logo" />
                                <h6>Game 1</h6>
                                <div class="lesson-container">
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