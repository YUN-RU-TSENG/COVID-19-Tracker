<template>
  <section class="sort">
    <ul class="sort_header">
      <li>
        <sortIcon /><span>新增確診</span>
      </li>
      <li>
        <sortIcon /><span>新增死亡</span>
      </li>
      <li>
        <sortIcon /><span>累計確診</span>
      </li>
      <li>
        <sortIcon /><span>累計死亡</span>
      </li>
    </ul>
  </section>
</template>

<script>
  import sortIcon from '@/assets/img/arrow_circle_down-24px.svg'

  export default {
    name: 'HomeSort',
    components: {
      sortIcon
    }
  }
</script>

<style lang="scss" scoped>
  .sort {
    padding: 12px 12px;
    font-size: 0;
    background-color: $theme-primary;
    border-radius: 4px;

    &_header {
      border-radius: 4px;
      border-radius: 4px;
      li {
        @include font(lighter, 12px, $font-primary);
        display: inline-block;
        text-align: center;
        width: 25%;
        background-color: $theme-secondary;
        transition: all 0.6s ease-in-out;
        color: $font-dark;
        padding: 6px;
        &:not(:last-of-type) {
          border-right: 2px solid $theme-primary;
        }
        span {
          vertical-align: middle;
        }
        svg {
          transition: inherit;
          vertical-align: middle;
          margin-right: 6px;
          fill: $font-primary;
        }
      }
    }
  }
</style>
