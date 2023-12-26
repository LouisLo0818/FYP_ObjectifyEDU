<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <h3 class="mt-5">Live Streaming</h3>
        <img :src="videoFeedUrl" height="500" width="500" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoFeedUrl: "",
    };
  },
  mounted() {
    this.videoFeedUrl = "http://127.0.0.1:5000/video_feed";
  },
};
</script>

<style scoped>
/* Add any CSS styles specific to this component */
</style>