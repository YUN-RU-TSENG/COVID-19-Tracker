<template>
  <div :class="styleObject">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      default: {
        type: Number,
        required: false,
        default: 12
      },
      pc: {
        type: Number,
        required: false
      },
      pad: {
        type: Number,
        required: false
      },
      phone: {
        type: Number,
        required: false
      },
      guttur: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    computed: {
      styleObject() {
        return {
          ['col-' + this.default]: this.default,
          ['col-phone-' + this.phone]: this.phone,
          ['col-pad-' + this.pad]: this.pad,
          ['col-pc-' + this.pc]: this.pc,
          'no-gutter': !this.guttur
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  %col {
    padding: 0 6px;
    flex: 0 0 auto;
  }

  .col-1 {
    @extend %col;
    width: 8.333333%;
  }

  .col-2 {
    @extend %col;
    width: 16.666667%;
  }

  .col-3 {
    @extend %col;
    width: 25%;
  }

  .col-4 {
    @extend %col;
    width: 33.333333%;
  }

  .col-5 {
    @extend %col;
    width: 41.666667%;
  }

  .col-6 {
    @extend %col;
    width: 50%;
  }

  .col-7 {
    @extend %col;
    width: 58.333333%;
  }

  .col-8 {
    @extend %col;
    width: 66.666667%;
  }

  .col-9 {
    @extend %col;
    width: 75%;
  }

  .col-10 {
    @extend %col;
    width: 83.333333%;
  }

  .col-11 {
    @extend %col;
    width: 91.666667%;
  }

  .col-12 {
    @extend %col;
    width: 100%;
  }

  .no-gutter {
    padding: 0px;
  }

  .col-phone-1 {
    @extend %col;
    width: 8.333333%;
  }

  .col-phone-2 {
    @extend %col;
    width: 16.666667%;
  }

  .col-phone-3 {
    @extend %col;
    width: 25%;
  }

  .col-phone-4 {
    @extend %col;
    width: 33.333333%;
  }

  .col-phone-5 {
    @extend %col;
    width: 41.666667%;
  }

  .col-phone-6 {
    @extend %col;
    width: 50%;
  }

  .col-phone-7 {
    @extend %col;
    width: 58.333333%;
  }

  .col-phone-8 {
    @extend %col;
    width: 66.666667%;
  }

  .col-phone-9 {
    @extend %col;
    width: 75%;
  }

  .col-phone-10 {
    @extend %col;
    width: 83.333333%;
  }

  .col-phone-11 {
    @extend %col;
    width: 91.666667%;
  }

  .col-phone-12 {
    @extend %col;

    width: 100%;
  }

  .col-pad-1 {
    @extend %col;
    width: 8.333333%;
  }

  .col-pad-2 {
    @extend %col;
    width: 16.666667%;
  }

  .col-pad-3 {
    @extend %col;
    width: 25%;
  }

  .col-pad-4 {
    @extend %col;
    width: 33.333333%;
  }

  .col-pad-5 {
    @extend %col;
    width: 41.666667%;
  }

  .col-pad-6 {
    @extend %col;
    width: 50%;
  }

  .col-pad-7 {
    @extend %col;
    width: 58.333333%;
  }

  .col-pad-8 {
    @extend %col;
    width: 66.666667%;
  }

  .col-pad-9 {
    @extend %col;
    width: 75%;
  }

  .col-pad-10 {
    @extend %col;
    width: 83.333333%;
  }

  .col-pad-11 {
    @extend %col;
    width: 91.666667%;
  }

  .col-pad-12 {
    @extend %col;
    width: 100%;
  }

  .col-pc-1 {
    @extend %col;
    width: 8.333333%;
  }

  .col-pc-2 {
    @extend %col;
    width: 16.666667%;
  }

  .col-pc-3 {
    @extend %col;
    width: 25%;
  }

  .col-pc-4 {
    @extend %col;
    width: 33.333333%;
  }

  .col-pc-5 {
    @extend %col;
    width: 41.666667%;
  }

  .col-pc-6 {
    @extend %col;
    width: 50%;
  }

  .col-pc-7 {
    @extend %col;
    width: 58.333333%;
  }

  .col-pc-8 {
    @extend %col;
    width: 66.666667%;
  }

  .col-pc-9 {
    @extend %col;
    width: 75%;
  }

  .col-pc-10 {
    @extend %col;
    width: 83.333333%;
  }

  .col-pc-11 {
    @extend %col;
    width: 91.666667%;
  }

  .col-pc-12 {
    @extend %col;
    width: 100%;
  }
</style>
