<template>
  <section class="card">
    <h2 class="card_title">Country name</h2>
    <section class="card_header">
      <div>
        <h2>Today Cases</h2>
        <p>
          <unhappyIcon /><span>+22</span></p>
      </div>
      <div>
        <h2>Today Cases</h2>
        <p>
          <unhappyIcon /><span>+22</span></p>
      </div>
    </section>
    <p class="card_text">Update at 00:00:00</p>
  </section>
</template>

<script>
  import unhappyIcon from '@/assets/img/sentiment_dissatisfied-24px.svg';
  export default {
    name: 'BaseCard',
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
      unhappyIcon
    }
  };
</script>

<style lang="scss" scoped>
  .card {
    padding: 20px;
    font-size: 0;
    background-color: #fff;
    border-radius: 4px;
    &_title {
      @include font(bold, 12px, $font-primary);
      color: $font-gray;
      margin-bottom: 16px;
    }
    &_header {
      border-radius: 4px;
      padding: 24px;
      border-radius: 4px;
      background-color: $theme-secondary;
      margin-bottom: 16px;
      div {
        text-align: center;
        display: inline-block;
        width: 50%;
      }
      h2 {
        @include font(lighter, 12px, $font-primary);
        color: $font-dark;
        margin-bottom: 6px;
      }
      p {
        opacity: 0.8;
        transition: all 0.3s ease-in-out;
        &:hover {
          opacity: 1;
          transform: rotate(5deg);
          cursor: context-menu;
        }
        span {
          @include font(bold, 24px, $font-primary);
          color: $warning;
          vertical-align: middle;
        }
        svg {
          vertical-align: middle;
          margin-right: 6px;
          fill: $warning;
        }
      }
    }
    &_text {
      @include font(lighter, 12px, $font-primary);
      color: $font-gray;
    }
  }
</style>