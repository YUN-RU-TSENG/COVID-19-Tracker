<template>
  <aside class="sidebar"
         @click="$emit('handler', false)">
    <ul class="sidebar_wrapper">
      <li>
        <a href
           class="sidebar_link"
           title="home">
          <appIcon /><span>主頁</span></a></li>
      <li><a href
           class="sidebar_link"
           title="reference">
          <infoIcon /><span>相關連結</span></a></li>
    </ul>
  </aside>
</template>

<script>
import appIcon from '@/assets/img/apps-24px.svg';
import infoIcon from '@/assets/img/info-24px.svg';

export default {
  name: 'HomeSideBar',
  data() {
    return {};
  },
  components: {
    appIcon,
    infoIcon,
  },
};
</script>

<style lang="scss" scoped>
  .sidebar {
    background-color: $dark-transparent;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 999;
    cursor: pointer;
    &_wrapper {
      background-color: $theme-primary;
      width: 80px;
      box-shadow: 0px 0px 10px $gray;
      height: 100vh;
      font-size: 0;
      padding: 60px 0px;
      cursor: default;
      @include Mediaquery-pad {
        width: 240px;
      }
      @include Mediaquery-pc {
        width: 240px;
      }
    }
    &_link {
      padding: 16px 24px;
      @include font(normal, 14px, $font-primary);
      display: block;
      color: $dark;
      transition: all 0.3s ease-in-out;
      &:active,
      &:hover {
        background-color: $brand-secondary;
      }
      svg {
        vertical-align: middle;
        margin-right: 12px;
      }
      span {
        display: none;
        @include Mediaquery-pad {
          display: inline;
        }
        @include Mediaquery-pc {
          display: inline;
        }
      }
    }
  }
</style>>
