<template>
  <nav class="navbar">
    <div class="navbar_item">
      <input class="navbar_search"
             type="search"
             placeholder="輸入搜尋國家關鍵字"
             :style="{ 'background': search, fontSize: '13px' }">
      <a class="navbar_link"
         href>
        <settings /></a>
    </div>
    <a class="navbar_menu"
       href @click.prevent="$emit('handler', true)">
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
    background-color: $theme-primary;
    font-size: 0;
    &_menu {
      width: 48px;
      padding: 12px;
      display: block;
      transform-origin: center;
      transition: all 0.6s ease-in-out;
      svg {
        fill: $dark;
      }
      &:active,
      &:focus,
      &:hover {
        svg {
          fill: $brand-secondary;
        }
      }
    }
    &_item {
      float: right;
    }
    &_link {
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
        transform: rotate(360deg);
        svg {
          fill: $brand-secondary;
        }
      }
    }
    &_search {
      height: 36px;
      padding: 6px 16px;
      border-radius: 18px;
      border-color: $theme-primary;
      border: 1px solid $gray;
      vertical-align: middle;
      transition: all 0.3s ease-in-out;
      @include font(normal, 14px, $font-primary);
      &:active,
      &:focus,
      &:hover {
        outline: none;
        opacity: 0.8;
        border-color: $brand-primary;
      }
    }
  }
</style>