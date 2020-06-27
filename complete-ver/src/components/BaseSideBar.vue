<template>
  <section class="sidebar_container">
    <aside class="sidebar">
      <ul>
        <li>
          <a href
             class="sidebar_link">
            <appIcon />主頁</a></li>
        <li><a href
             class="sidebar_link">
            <infoIcon />相關連結</a></li>
      </ul>
    </aside>
  </section>
</template>

<script>
  import appIcon from '@/assets/img/apps-24px.svg';
  import infoIcon from '@/assets/img/info-24px.svg';
  export default {
    name: 'BaseSideBar',
    data() {
      return {};
    },
    components: {
      appIcon,
      infoIcon
    }
  };
</script>

<style lang="scss" scoped>
  .sidebar {
    background-color: $theme-primary;
    width: 240px;
    box-shadow: 0px 0px 10px $gray;
    height: 100vh;
    font-size: 0;
    padding: 60px 0px;
    &_container {
      background-color: $dark-transparent;
      position: fixed;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      z-index: 999;
    }
    &_link {
      padding: 16px 24px;
      @include font(normal, 14px, $font-primary);
      display: block;
      color: $dark;
      svg {
        vertical-align: middle;
        margin-right: 12px;
      }
      &:active,
      &:hover {
        color: $gray;
        svg {
          fill: $gray;
        }
      }
    }
  }
</style>>
