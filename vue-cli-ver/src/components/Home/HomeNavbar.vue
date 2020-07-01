<template>
  <nav class="navbar clearfix">
    <div class="navbar_item">
      <input class="navbar_search"
             type="search"
             placeholder="輸入搜尋國家關鍵字"
             v-model.trim="searchText">
      <a class="navbar_link"
         href>
        <settings /></a>
      <div class="navbar_search_item"
           :class="{'active': countries.length }">
        <a href
           v-for="country in countriesDisplay"
           @click.prevent="$router.push({name: 'country', params:{ country: country.Country }})"
           :key="country.Country">
          <template v-if="country.isSearchTextFirst">
            <span>{{ searchText }}</span>{{ country.font }}22
          </template>
          <template v-else>
            {{ country.fontStart}}<span>{{ searchText }}</span>{{country.fontEnd }}
          </template>
        </a>
      </div>
    </div>
    <a class="navbar_menu"
       href
       @click.prevent="$emit('handler', true)">
      <menuIcon /></a>
  </nav>
</template>

<script>
  import menuIcon from '@/assets/img/menu-24px.svg';
  import settings from '@/assets/img/settings-24px.svg';

  export default {
    name: 'HomeNavbar',
    props: {
      countries: {
        type: Array,
        require: true
      }
    },
    data() {
      return {
        searchText: '',
        componentCountries: []
      };
    },
    watch: {
      searchText: {
        handler: function(value) {
          this.$emit('handlerSearch', value);
        }
      }
    },
    computed: {
      countriesDisplay() {
        return this.countries.slice().map(data => {
          const fontStartIndex = data
            .toLowerCase()
            .indexOf(this.searchText.toLowerCase());
          if (fontStartIndex === 0) {
            return {
              font: data.slice(this.searchText.length),
              isSearchTextFirst: true,
              country: data.Country
            };
          } else {
            const fontStartIndex = data
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase());
            const fontEndIndex = fontStartIndex + this.searchText.length;
            const fontArray = data.split('');
            const fontStart = fontArray.slice(0, fontStartIndex).join('');
            const fontEnd = fontArray.slice(fontEndIndex).join('');
            return {
              fontStart,
              fontEnd,
              isSearchTextFirst: false,
              country: data.Country
            };
          }
        });
      }
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
      transition: all 0.6s ease-out;
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
      position: relative;
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
    &_search_item {
      position: absolute;
      width: 200px;
      left: 0;
      top: calc(100% + 24px);
      background-color: $theme-primary;
      border-radius: 4px;
      transform: scale(1, 0);
      transform-origin: left top;
      transition: all 0.6s ease-in-out;
      box-shadow: 0px 0px 10px $gray;
      &.active {
        transform: scale(1, 1);
      }
      &.active::before {
        content: '';
        position: absolute;
        top: -16px;
        left: 12px;
        border-color: transparent transparent $theme-primary transparent;
        border-style: solid solid solid solid;
        border-width: 8px;
      }
      a {
        display: block;
        @include font(lighter, 14px, $font-primary);
        padding: 12px;
        &:hover {
          background-color: $theme-secondary;
        }
        &:not(:last-of-type) {
          border-bottom-color: $theme-secondary;
          border-bottom-width: 1px;
          border-bottom-style: solid;
        }
        span {
          color: $brand-primary;
        }
      }
    }
  }
</style>