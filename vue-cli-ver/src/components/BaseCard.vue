<template>
  <a href
     class="card_link">
    <section class="card">
      <a href
         class="card_pin">
        <pinIcon /></a>
      <h2 class="card_title">{{ country }}</h2>
      <section class="card_header">
        <div>
          <h2>新增確診</h2>
          <p>
            <alarmIcon /><span>{{ newConfirmed}} </span></p>
        </div>
        <div>
          <h2>新增死亡</h2>
          <p>
            <infoIcon /><span>{{ newDeaths }}</span></p>
        </div>
        <div>
          <h2>累計確診</h2>
          <p>
            <alarmIcon /><span>{{ totalDeaths }}</span></p>
        </div>
        <div>
          <h2>累計死亡</h2>
          <p>
            <infoIcon /><span>{{ totalConfirmed }}</span></p>
        </div>
      </section>
      <p class="card_text">Update at {{date}} . 累計至該時間共 {{ totalRecovered }} 人康復.</p>

    </section>
  </a>
</template>

<script>
  import alarmIcon from '@/assets/img/alarm.svg';
  import infoIcon from '@/assets/img/info-24px.svg';
  import pinIcon from '@/assets/img/push_pin-24px.svg';
  
  export default {
    name: 'BaseCard',
    props: {
      country: { type: String, required: true },
      countryCode: { type: String, required: true },
      date: { type: Date, required: true },
      newConfirmed: { type: Number, required: true },
      newDeaths: { type: Number, required: true },
      newRecovered: { type: Number, required: true },
      totalConfirmed: { type: Number, required: true },
      totalDeaths: { type: Number, required: true },
      totalRecovered: { type: Number, required: true }
    },
    data() {
      return {};
    },
    components: {
      alarmIcon,
      pinIcon,
      infoIcon
    }
  };
</script>

<style lang="scss" scoped>
  .card {
    padding: 10px 20px 20px 20px;
    font-size: 0;
    background-color: $theme-primary;
    border-radius: 4px;
    &_pin {
      float: right;
      opacity: 0.5;
      transition: all 0.3s cubic-bezier(0.1, 0.5, 1, 0.1);
      svg {
        transform: rotate(45deg);
        fill: $dark;
      }
      &:hover,
      &:active {
        opacity: 1;
        svg {
          fill: $brand-primary;
          transform: rotate(0deg);
        }
      }
    }
    &_link {
      display: block;
      transition: all 0.3s ease-in-out;
      &:hover {
        opacity: 0.8;
      }
    }
    &_title {
      @include font(bold, 12px, $font-primary);
      color: $font-gray;
      margin-bottom: 16px;
      margin-top: 10px;
    }
    &_header {
      border-radius: 4px;
      border-radius: 4px;
      background-color: $theme-secondary;
      margin-bottom: 16px;
      @include Mediaquery-phone {
        padding: 24px;
      }
      div {
        text-align: center;
        display: inline-block;
        width: 50%;
        padding: 12px 0px;
        @include Mediaquery-phone {
          width: 25%;
          padding: 0px;
        }
      }
      h2 {
        @include font(lighter, 12px, $font-primary);
        color: $font-dark;
        margin-bottom: 6px;
      }
      p {
        transition: all 0.3s ease-in-out;
        &:hover {
          transform: scale(0.9);
        }
      }
      span {
        @include font(bold, 24px, $font-secondary);
        color: $warning;
        vertical-align: middle;
      }
      svg {
        vertical-align: middle;
        margin-right: 6px;
        fill: $warning;
      }
    }
    &_text {
      @include font(lighter, 12px, $font-primary);
      color: $font-dark;
    }
  }
</style>