<template>
  <section class="item clearfix">
    <div class="item_bacteria_icon">
      <coronavirus />
    </div>
    <h3 class="item_title">{{ name }} :</h3>
    <p class="item_patient">{{ chineseName }} <span>{{  number | displayNumber  }}</span> 人</p>
    <p class="item_information">
      今日截至目前共有
      <span class="information_trend circle-primary">
        {{ number | displayNumber }}
        <arrowUpIcon />
      </span>
      位 {{ chineseName }}。最後更新時間為 {{ date | displayDay }}
    </p>
  </section>
</template>

<script>
  import coronavirus from '@/assets/img/coronavirus.svg';
  import arrowUpIcon from '@/assets/img/arrow_circle_up-24px.svg';

  import dayjs from 'dayjs';

  export default {
    name: 'HomeItem',
    components: {
      coronavirus,
      arrowUpIcon,
    },
    filters: {
      displayNumber(data) {
        return !parseInt(data, 10)
          ? '-'
          : parseInt(data, 10).toLocaleString('zh-TW', {
              style: 'decimal',
              useGrouping: true,
            });
      },
      displayDay(date) {
        return dayjs(date).format('MM月DD日 HH:mm');
      },
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      chineseName: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .item {
    background-color: $theme-primary;
    border-radius: 4px;
    padding: 16px 12px;
    font-size: 0;

    &_title {
      @include font(normal, 12px, $font-primary);
      color: $font-gray;
      margin-bottom: 6px;
      transform-origin: top left;
      transform: scale(0.8);
    }

    &_patient {
      @include font(bold, 16px, $font-primary);
      color: $font-dark;
      margin-bottom: 12px;
      span {
        @include font(bold, 16px, $font-secondary);
        color: $warning;
      }
    }

    &_information {
      @include font(normal, 12px, $font-primary);
      transform-origin: top left;
      transform: scale(0.8);
      color: $font-gray;
      margin-bottom: -8px;
      text-align: justify;
      span {
        @include font(bold, 12px, $font-primary);
        color: $infomation;
        svg {
          vertical-align: text-top;
          fill: $infomation;
        }
      }
    }

    &_bacteria_icon {
      float: right;
      padding: 4px;
      border-radius: 4px;
      background-color: $theme-secondary;
    }
  }

  .circle-primary {
    animation: circle-primary 3s ease-in 0s infinite;
  }

  @keyframes circle-primary {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8) rotate(160deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
</style>
