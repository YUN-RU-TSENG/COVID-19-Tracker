<template>
  <section class="sort">
    <ul class="sort_header">
      <li>
        <a href
           title="sort by this type">
          <sortIcon /><span>Today Cases</span>
        </a></li>
      <li>
        <a href
           title="sort by this type">

          <sortIcon /><span>Today Cases</span>
        </a>
      </li>
      <li>
        <a href
           title="sort by this type">
          <sortIcon /><span>Today Cases</span>
        </a></li>
      <li>
        <a href
           title="sort by this type">

          <sortIcon /><span>Today Cases</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  import sortIcon from '@/assets/img/arrow_circle_down-24px.svg';
  export default {
    name: 'BaseSort',
    props: {},
    data() {
      return {};
    },
    components: {
      sortIcon
    }
  };
</script>

<style lang="scss" scoped>
  .sort {
    padding: 12px 20px;
    font-size: 0;
    background-color: $theme-primary;
    border-radius: 4px;
    &_header {
      border-radius: 4px;
      border-radius: 4px;
      a {
        transition: all 0.6s ease-in-out;
        color: $font-dark;
        display: block;
        padding: 6px;
        &:hover,
        &:active {
          background-color: $brand-secondary;
        }
        &:not(:last-of-type) {
          border-right: 1px solid $theme-primary;
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
      li {
        @include font(lighter, 12px, $font-primary);
        display: inline-block;
        text-align: center;
        width: 25%;
        background-color: $theme-secondary;
      }
    }
  }
</style>