<template>
  <section class="item clearfix">
    <div class="item_people_icon">
      <coronavirus />
    </div>
    <h3 class="item_title">{{ name }} :</h3>
    <p class="item_patient">{{ chineseName }} <span>{{  number | displayNumber  }}</span> 人</p>
    <p class="item_information">
      今日截至目前共有
      <span class="information_trend"
            :class="{ styleObject }">
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
  // import arrowDownIcon from '@/assets/img/arrow_circle_down-24px.svg';

  import dayjs from 'dayjs';

  export default {
    name: 'HomeItem',
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
    computed: {
      styleObject() {
        let result = this.index % 2 ? 'primary' : 'secondary';
        return {
          ['circle-' + result]: true,
        };
      },
    },
    filters: {
      displayNumber(data) {
        if (!parseInt(data, 10)) return '無';
        return parseInt(data, 10).toLocaleString('zh-TW', {
          style: 'decimal',
          useGrouping: true,
        });
      },
      displayDay(date) {
        return dayjs(date).format('MM月DD日 HH:mm');
      },
    },
    components: {
      coronavirus,
      arrowUpIcon,
      // arrowDownIcon
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

    &_people_icon {
      float: right;
      padding: 4px;
      border-radius: 4px;
      background-color: $theme-secondary;
    }
  }

  .circle-primary {
    animation: circle-primary 3s ease-in 0s infinite;
  }
  .circle-secondary {
    animation: circle-secondary 5s ease-in 0s infinite;
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

  @keyframes circle-secondary {
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(1.1) rotate(-40deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
</style>
