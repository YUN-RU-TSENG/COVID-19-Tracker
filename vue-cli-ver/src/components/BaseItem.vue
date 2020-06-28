<template>
  <a href
     class="item_link">
    <section class="item">
      <div class="people_icon">
        <facemaskIcon />
      </div>
      <h3 class="item_title">{{ name }}</h3>
      <p class="item_patient">{{ totalData }}</p>
      <p class="item_information">
        Today totally add
        <span class="information_trend">
          {{ addData }}
          <arrowUpIcon />
        </span>
        update {{ time.getMinutes() }} minute ago.
      </p>
    </section>
  </a>
</template>

<script>
  import facemaskIcon from '@/assets/img/facemask.svg';
  import arrowUpIcon from '@/assets/img/arrow_circle_up-24px.svg';
  // import arrowDownIcon from '@/assets/img/arrow_circle_down-24px.svg';

  export default {
    name: 'BaseItem',
    props: {
      totalData: {
        type: Number,
        // required: true,
        default: 12
      },
      addData: {
        type: Number,
        // required: true,
        default: 12
      },
      name: {
        type: String,
        // required: true,
        default: 'Defdault'
      },
      time: {
        type: Date,
        // required: true,
        default: new Date()
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

    &_link {
      display: block;
    }

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