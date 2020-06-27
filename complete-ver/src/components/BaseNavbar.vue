<template>
  <nav class="navbar">
    <div class="navbar_item">
      <input class="item_search"
             type="search"
             :style="{ 'background': search, fontSize: '13px' }">
      <a class="item_link"
         href>
        <settings /></a>
    </div>
    <a class="navbar_menu"
       href>
      <menuIcon /></a>
  </nav>
</template>

<script>
  import menuIcon from '@/assets/img/menu-24px.svg';
  import settings from '@/assets/img/settings-24px.svg';

  export default {
    name: 'BaseNavbar',
    data() {
      return {
        search: 'url(' + require('@/assets/img/search-24px.svg') + ')'
      };
    },
    components: {
      menuIcon,
      settings
    }
  };
</script>

<style lang="scss" scoped>
  .navbar {
    padding: 6px 4px;
    background-color: #fff;
    font-size: 0;
    &_menu {
      width: 48px;
      padding: 12px;
      display: block;
      svg {
        fill: $dark;
      }
      &:active,
      &:focus,
      &:hover {
        transition: all 0.6s ease-in-out;
        transform: rotate(360deg);
        transform-origin: center;
        opacity: 0.5;
      }
    }
    &_item {
      margin-right: 0;
      float: right;
      .item_link {
        display: inline-block;
        padding: 12px;
        vertical-align: middle;
        transition: all 0.6s ease-in-out;
        transform-origin: center;
        svg {
          fill: $dark;
        }
        &:active,
        &:focus,
        &:hover {
          opacity: 0.5;
          transform: rotate(360deg);
        }
      }
      .item_search {
        height: 36px;
        padding: 6px 24px;
        border-radius: 18px;
        border-color: #fff;
        border: 1px solid $gray;
        vertical-align: middle;
        transition: all 0.3s ease-in-out;
        @include font(normal, 14px, $font-primary);
        &:active,
        &:focus,
        &:hover {
          outline: none;
          opacity: 0.8;
        }
      }
    }
  }
</style>