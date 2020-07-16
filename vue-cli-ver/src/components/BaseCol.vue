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
  @for $i from 1 through 12 {
    .col-#{$i} {
      padding: 0 6px;
      flex: 0 0 auto;
      width: $i / 12 * 100%;
    }
  }
  @media (min-width: 576px) {
    @for $i from 1 through 12 {
      .col-phone-#{$i} {
        padding: 0 6px;
        flex: 0 0 auto;
        width: $i / 12 * 100%;
      }
    }
  }
  @media (min-width: 768px) {
    @for $i from 1 through 12 {
      .col-pad-#{$i} {
        padding: 0 6px;
        flex: 0 0 auto;
        width: $i / 12 * 100%;
      }
    }
  }
  @media (min-width: 1024px) {
    @for $i from 1 to 12 {
      .col-pc-#{$i} {
        padding: 0 6px;
        flex: 0 0 auto;
        width: $i / 12 * 100%;
      }
    }
  }
</style>
