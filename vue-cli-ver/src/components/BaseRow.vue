<template>
  <section class="row">
    <slot></slot>
  </section>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>