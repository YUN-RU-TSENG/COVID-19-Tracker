<template>
  <section class="sort">
    <ul class="sort_header">
      <a href
         title="sort by this type">
        <li>
          <sortIcon /><span>Today Cases</span></li>
      </a>
      <a href
         title="sort by this type">
        <li>
          <sortIcon /><span>Today Cases</span></li>
      </a>
      <a href
         title="sort by this type">
        <li>
          <sortIcon /><span>Today Cases</span></li>
      </a>
      <a href
         title="sort by this type">
        <li>
          <sortIcon /><span>Today Cases</span></li>
      </a>
    </ul>
  </section>
</template>

<script>
  import sortIcon from '@/assets/img/arrow_circle_down-24px.svg';
  export default {
    name: 'BaseSort',
    props: {
      todayCases: {
        type: Number,
        required: true,
        default: 12
      },
      todayDeathes: {
        type: Number,
        required: true,
        default: 12
      },
      allCases: {
        type: Number,
        required: true,
        default: 12
      },
      allDeathes: {
        type: Number,
        required: true,
        default: 12
      }
    },
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
        background-color: $theme-secondary;
        text-align: center;
        display: inline-block;
        width: 25%;
        padding: 6px;
        transition: all 0.3s ease-in-out;
        &:hover,
        &:active {
          opacity: 0.6;
        }
        &:not(:last-of-type) {
          border-right: 1px solid $theme-primary;
        }
      }
      li {
        @include font(lighter, 12px, $font-primary);
        color: $font-dark;
        display: inline;
        span {
          vertical-align: middle;
        }
        svg {
          vertical-align: middle;
          margin-right: 6px;
          fill: $font-primary;
        }
      }
    }
  }
</style>