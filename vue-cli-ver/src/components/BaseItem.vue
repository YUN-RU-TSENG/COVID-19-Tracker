<template>
  <section class="item">
    <div class="people_icon">
      <facemaskIcon />
    </div>
    <h3 class="item_title">{{ name }} :</h3>
    <p class="item_patient">{{chineseName}}<span>{{ ' ' + number+ ' ' }}</span>人</p>
    <p class="item_information">
      今日截至目前共有
      <span class="information_trend">
        {{ number }}
        <arrowUpIcon />
      </span>
      位 {{ chineseName }}。最後更新時間為 {{ date }}
    </p>
  </section>
</template>

<script>
  import facemaskIcon from '@/assets/img/facemask.svg';
  import arrowUpIcon from '@/assets/img/arrow_circle_up-24px.svg';
  // import arrowDownIcon from '@/assets/img/arrow_circle_down-24px.svg';

  export default {
    name: 'BaseItem',
    props: {
      name: {
        type: String,
        required: true
      },
      chineseName: {
        type: String,
        required: true
      },
      number: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    },
    data() {
      return {};
    },
    components: {
      facemaskIcon,
      arrowUpIcon
      // arrowDownIcon
    }
  };
</script>

<style lang="scss" scoped>
  .item {
    background-color: $theme-primary;
    border-radius: 4px;
    padding: 16px;
    font-size: 0;

    &_title {
      @include font(normal, 12px, $font-primary);
      color: $font-gray;
      margin-bottom: 10px;
      transform-origin: top left;
      transform: scale(0.8);
    }
    &_patient {
      @include font(bold, 16px, $font-primary);
      color: $font-dark;
      margin-bottom: 14px;
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
      span {
        @include font(bold, 12px, $font-primary);
        color: $infomation;
        svg {
          vertical-align: text-top;
          fill: $infomation;
        }
      }
    }

    .people_icon {
      float: right;
      padding: 4px;
      border-radius: 4px;
      background-color: $brand-secondary;
      > svg {
        fill: $brand-primary;
      }
    }
  }
</style>