<template>
  <div id="app"
       class="app">
  </div>
</template>

<script>
  export default {
    created() {
      this.dispatch('getCovid_19_data');
    }
  };
</script>

<style lang="scss">
  .app {
    min-height: 100vh;
    background-color: $theme-secondary;
  }
</style>
