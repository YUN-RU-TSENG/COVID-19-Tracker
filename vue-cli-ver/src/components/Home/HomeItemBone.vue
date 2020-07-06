<template>
  <section class="item clearfix">
    <div class="lazy-load"></div>
  </section>
</template>

<script>
  export default {
    name: 'HomeItemBone',
    data() {
      return {};
    },
    components: {}
  };
</script>

<style lang="scss" scoped>
  .item {
    background-color: $theme-secondary;
    border-radius: 4px;
    font-size: 0;
    height: 129px;
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
