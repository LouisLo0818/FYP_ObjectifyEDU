<template>
    <div class="rating-container">
        <div class="rating-box">
            <header>How was your experience?</header>
            <div class="stars">
                <i class="bx bxs-star" v-for="index in 5" :key="index" :class="{ 'active': index <= rating }"
                    @click="setRating(index)"></i>
            </div>
            <div class="submit">
                <button class="btn btn-primary" @click="submitRating">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rating: 0, // Initial rating value
        };
    },
    mounted() {
        this.feedbackInterface();
    },
    methods: {
        setRating(index) {
            this.rating = index;
        },
        // if click submit button then rating-box display none
        async submitRating() {
            // Process the rating here before hiding the rating box
            const rating = document.querySelector(".rating-container");
            rating.style.display = "none";

            const stuid = localStorage.getItem("student_id");

            const stuidInput = {
                course_id: this.$route.params.id,
                game_id: this.$route.params.gameId,
                student_id: stuid,
                feedback: this.rating
            };

            console.log(stuidInput);

            try {
                const token = localStorage.getItem("user");

                const response = await fetch("/api/feedback", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        // Include the token in the Authorization header
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(stuidInput),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch the student data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async feedbackInterface() {
            console.log("feedbackInterface");
            const stuid = localStorage.getItem("student_id");

            const stuidInput = {
                student_id: stuid,
            };

            try {
                const token = localStorage.getItem("user");

                const response = await fetch("/api/Student", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Include the token in the Authorization header
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(stuidInput),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch the student data");
                }

                const jsonData = await response.json();
                const course = jsonData[0].courses.find(course => course.course_id === this.$route.params.id);
                const game = course.games.find(game => game.game_id === this.$route.params.gameId);

                // check the student finished the game or not
                const finished = game.questions.length
                console.log(finished);
                // if student have no give feedback will hide the rating box
                const feedback = game.feedback;
                console.log(feedback);

                if (finished >= 10 && feedback === -1) {
                    const rating = document.querySelector(".rating-container");
                    rating.style.display = "block";
                } else {
                    const rating = document.querySelector(".rating-container");
                    rating.style.display = "none";
                }


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
    },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.rating-container {
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 2;
    /* Sit on top */
    padding-top: 100px;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
    display: none;
}

.rating-box {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 25px 50px 35px;
    border-radius: 25px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
}

.rating-box header {
    font-size: 22px;
    color: #dadada;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: center;
}

.rating-box .stars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
}

.stars i {
    color: #e6e6e6;
    font-size: 35px;
    cursor: pointer;
    transition: color 0.2s ease;
}

.stars i.active {
    color: #ff9c1a;
}

.submit {
    display: flex;
    width: 40%;
    margin: 20px auto 0 auto;
    height: 40px;
}
</style>