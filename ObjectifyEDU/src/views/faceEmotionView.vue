<template>
    <div>
        <span id="reward-container"></span>
    </div>
</template>

<script>
export default {
    mounted() {
        this.showRewards();
    },
    methods: {
        showRewards() {
            const confettiConfig = {
                startVelocity: 30,
                elementCount: 100,
                spread: 360,
            };
            const emojiConfig = {
                elementCount: 35,
                spread: 180,
                emojis: ['🎉', '😄', '🥳'],
            };

            // Assuming `$reward` returns a function that, when called, activates the reward animation
            const { reward: confettiReward } = this.$reward('reward-container', 'confetti', confettiConfig);
            const { reward: emojiReward } = this.$reward('reward-container', 'emoji', emojiConfig);

            // Trigger both rewards
            confettiReward();
            emojiReward();
        },
    },
};
</script>

<style scoped>
#reward-container {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>