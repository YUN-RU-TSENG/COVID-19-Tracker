<template>
  <a href
     class="card_link"
     @click.prevent="">
    <section class="card">
      <a href
         class="card_pin"
         :class="{'active': pin}"
         @click.prevent="$emit('handler', country)">
        <pinIcon /></a>
      <h2 class="card_title">{{ displayIndex(index) + '. ' + country }}</h2>
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
            <alarmIcon /><span>{{ totalConfirmed }}</span></p>
        </div>
        <div>
          <h2>累計死亡</h2>
          <p>
            <infoIcon /><span>{{ totalDeaths }}</span></p>
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
    name: 'HomeCard',
    props: {
      index: {
        type: Number,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      countryCode: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      newConfirmed: {
        type: Number,
        required: true
      },
      newDeaths: {
        type: Number,
        required: true
      },
      newRecovered: {
        type: Number,
        required: true
      },
      totalConfirmed: {
        type: Number,
        required: true
      },
      totalDeaths: {
        type: Number,
        required: true
      },
      totalRecovered: {
        type: Number,
        required: true
      },
      pin:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    methods: {
      displayIndex(index){
        return index + 1
      }
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
    padding: 12px;
    font-size: 0;
    background-color: $theme-primary;
    border-radius: 4px;
    &_pin {
      float: right;
      opacity: 0.5;
      transition: all 0.3s cubic-bezier(0.1, 0.5, 1, 0.1);
      &.active{
        opacity: 1;
        svg{
          transform: rotate(0deg);
          fill: $brand-primary;
        }
      }
      svg {
        transform: rotate(45deg);
        fill: $dark;
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
      color: $font-dark;
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
      @include Mediaquery-pad {
        padding: 24px;
      }
      @include Mediaquery-pc {
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
        @include Mediaquery-pad {
          width: 25%;
          padding: 0px;
        }
        @include Mediaquery-pc {
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
