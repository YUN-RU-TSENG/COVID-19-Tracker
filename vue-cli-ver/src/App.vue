<template>
  <div id="app"
       class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {

      };
    }
  };
</script>

<style lang="scss">
  #app #nprogress .bar {
      background: red !important;
    }
</style>
