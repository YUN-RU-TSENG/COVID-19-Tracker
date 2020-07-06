<template>
  <div class="card">
    <div class="lazy-load"></div>
  </div>
</template>

<script>
  export default {
    name: 'HomeCardBone',
    data() {
      return {};
    }
  };
</script>

<style lang="scss" scoped>
  .card {
    height: 196px;
    font-size: 0;
    background-color: $theme-secondary;
    border-radius: 4px;
    position: relative;
    .lazy-load {
      position: absolute;
      border-radius: 24px;
      width: 0;
      height: 0;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: $theme-primary;
      animation: dotted 1s ease-in 0s infinite;
    }
  }
    @keyframes dotted {
    0% {
      width: 0;
      height: 0;
    }
    50% {
      width: 20px;
      height: 20px;
    }
    100% {
      width: 0;
      height: 0;
    }
  }
</style>
