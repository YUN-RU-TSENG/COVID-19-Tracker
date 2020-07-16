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
  .col-pad-1,
  .col-pad-2,
  .col-pad-3,
  .col-pad-4,
  .col-pad-5,
  .col-pad-6,
  .col-pad-7,
  .col-pad-8,
  .col-pad-9,
  .col-pad-10,
  .col-pad-11,
  .col-pad-12,
  .col-pad-1,
  .col-pad-2,
  .col-pad-3,
  .col-pad-4,
  .col-pad-5,
  .col-pad-6,
  .col-pad-7,
  .col-pad-8,
  .col-pad-9,
  .col-pad-10,
  .col-pad-11,
  .col-pad-12,
  .col-pc-1,
  .col-pc-2,
  .col-pc-3,
  .col-pc-4,
  .col-pc-5,
  .col-pc-6,
  .col-pc-7,
  .col-pc-8,
  .col-pc-9,
  .col-pc-10,
  .col-pc-11,
  .col-pc-12,
  .col-phone-1,
  .col-phone-2,
  .col-phone-3,
  .col-phone-4,
  .col-phone-5,
  .col-phone-6,
  .col-phone-7,
  .col-phone-8,
  .col-phone-9,
  .col-phone-10,
  .col-phone-11,
  .col-phone-12,
  .col-1,
  .col-2,
  .col-3,
  .col-4,
  .col-5,
  .col-6,
  .col-7,
  .col-8,
  .col-9,
  .col-10,
  .col-11,
  .col-12 {
    padding: 0 6px;
  }

  .col-1 {
    flex: 0 0 auto;
    width: 8.333333%;
  }

  .col-2 {
    flex: 0 0 auto;
    width: 16.666667%;
  }

  .col-3 {
    flex: 0 0 auto;
    width: 25%;
  }

  .col-4 {
    flex: 0 0 auto;
    width: 33.333333%;
  }

  .col-5 {
    flex: 0 0 auto;
    width: 41.666667%;
  }

  .col-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-7 {
    flex: 0 0 auto;
    width: 58.333333%;
  }

  .col-8 {
    flex: 0 0 auto;
    width: 66.666667%;
  }

  .col-9 {
    flex: 0 0 auto;
    width: 75%;
  }

  .col-10 {
    flex: 0 0 auto;
    width: 83.333333%;
  }

  .col-11 {
    flex: 0 0 auto;
    width: 91.666667%;
  }

  .col-12 {
    flex: 0 0 auto;
    width: 100%;
  }

  .no-gutter {
    padding: 0px;
  }

  @media (min-width: 576px) {
    .col-phone-1 {
      flex: 0 0 auto;
      width: 8.333333%;
    }

    .col-phone-2 {
      flex: 0 0 auto;
      width: 16.666667%;
    }

    .col-phone-3 {
      flex: 0 0 auto;
      width: 25%;
    }

    .col-phone-4 {
      flex: 0 0 auto;
      width: 33.333333%;
    }

    .col-phone-5 {
      flex: 0 0 auto;
      width: 41.666667%;
    }

    .col-phone-6 {
      flex: 0 0 auto;
      width: 50%;
    }

    .col-phone-7 {
      flex: 0 0 auto;
      width: 58.333333%;
    }

    .col-phone-8 {
      flex: 0 0 auto;
      width: 66.666667%;
    }

    .col-phone-9 {
      flex: 0 0 auto;
      width: 75%;
    }

    .col-phone-10 {
      flex: 0 0 auto;
      width: 83.333333%;
    }

    .col-phone-11 {
      flex: 0 0 auto;
      width: 91.666667%;
    }

    .col-phone-12 {
      flex: 0 0 auto;
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .col-pad-1 {
      flex: 0 0 auto;
      width: 8.333333%;
    }

    .col-pad-2 {
      flex: 0 0 auto;
      width: 16.666667%;
    }

    .col-pad-3 {
      flex: 0 0 auto;
      width: 25%;
    }

    .col-pad-4 {
      flex: 0 0 auto;
      width: 33.333333%;
    }

    .col-pad-5 {
      flex: 0 0 auto;
      width: 41.666667%;
    }

    .col-pad-6 {
      flex: 0 0 auto;
      width: 50%;
    }

    .col-pad-7 {
      flex: 0 0 auto;
      width: 58.333333%;
    }

    .col-pad-8 {
      flex: 0 0 auto;
      width: 66.666667%;
    }

    .col-pad-9 {
      flex: 0 0 auto;
      width: 75%;
    }

    .col-pad-10 {
      flex: 0 0 auto;
      width: 83.333333%;
    }

    .col-pad-11 {
      flex: 0 0 auto;
      width: 91.666667%;
    }

    .col-pad-12 {
      flex: 0 0 auto;
      width: 100%;
    }
  }

  @media (min-width: 1024px) {
    .col-pc-1 {
      flex: 0 0 auto;
      width: 8.333333%;
    }

    .col-pc-2 {
      flex: 0 0 auto;
      width: 16.666667%;
    }

    .col-pc-3 {
      flex: 0 0 auto;
      width: 25%;
    }

    .col-pc-4 {
      flex: 0 0 auto;
      width: 33.333333%;
    }

    .col-pc-5 {
      flex: 0 0 auto;
      width: 41.666667%;
    }

    .col-pc-6 {
      flex: 0 0 auto;
      width: 50%;
    }

    .col-pc-7 {
      flex: 0 0 auto;
      width: 58.333333%;
    }

    .col-pc-8 {
      flex: 0 0 auto;
      width: 66.666667%;
    }

    .col-pc-9 {
      flex: 0 0 auto;
      width: 75%;
    }

    .col-pc-10 {
      flex: 0 0 auto;
      width: 83.333333%;
    }

    .col-pc-11 {
      flex: 0 0 auto;
      width: 91.666667%;
    }

    .col-pc-12 {
      flex: 0 0 auto;
      width: 100%;
    }
  }
</style>
