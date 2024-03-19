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
    methods: {
        setRating(index) {
            this.rating = index;
        },
        // if click submit button then rating-box display none
        submitRating() {
            // Process the rating here before hiding the rating box
            const rating = document.querySelector(".rating-container");
            rating.style.display = "none";
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