<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0px -6px;
  }
</style>
