<template>
    <div class="flex-container">
        <side />
        <div class="main">
            <navbar />
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
</style>