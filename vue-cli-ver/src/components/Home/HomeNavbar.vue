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
           :class="{'active': filterMatchCountry.length }">
        <a href
           v-for="country in filterMatchCountry"
           @click.prevent="$emit('handlerNextPage', country.country)"
           :key="country.country">
          <template v-if="!country.fontStart">
            <span>{{ country.fontMatch }}</span>{{ country.fontEnd }}
          </template>
          <template v-else>
            {{ country.fontStart }}<span>{{ country.fontMatch }}</span>{{ country.fontEnd }}
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
// svg
import menuIcon from '@/assets/img/menu-24px.svg';
import settings from '@/assets/img/settings-24px.svg';

export default {
  name: 'HomeNavbar',
  props: {
    countries: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
  computed: {
    filterMatchCountry() {
      if (!this.searchText) return [];
      const tests = this.countries
        .filter((item) => {
          const regexp = new RegExp(this.searchText, 'gi');
          return regexp.test(item.Country) || regexp.test(item.ISO2);
        })
        .map((item) => {
          const test = `${item.Country}, ${item.ISO2}`;
          return {
            country: item.Country,
            test,
          };
        });
      return this.hightlightMatchText(tests);
    },
  },
  methods: {
    /**
       * TODO: 將符合的字串分割成符合以及非符合，當渲染的時候便可以依照符合以及未符合的文字配合模板渲染畫面，並且會依照國家符合字串的 index 先後排列。
       * 例如 asssw 匹配 a，則會被返回成 a, sssw 配合模板渲染。
       * 例如 asssw 匹配 ss，則會被返回成 a,ss,sw 配合模板渲染。
       *
       * ! 由於有符合開頭（一）、符合中斷、結尾（二）情況，故返回兩種不同的物件，透過是否有 fontStart 判定。
       *
       * @param { Array } 字串的陣列集合
       * return 返回包含符合字串(fontMatch)、符合前後字串(fontStart, fontEnd)、國家名稱(country)、符合字串 index(fontStartIndex)
       *  */
    hightlightMatchText(tests) {
      if (!Array.isArray(tests)) return;
      return tests
        .map((test) => {
          const fontStartIndex = test.toLowerCase().indexOf(this.searchText.toLowerCase());
          if (!fontStartIndex) {
            // 吻合的文字
            const fontMatch = test.slice(0, this.searchText.length);
            // 吻合文字之後的文字
            const fontEnd = test.slice(this.searchText.length);

            return {
              fontMatch,
              fontEnd,
              fontStart: null,
              country: test,
              fontStartIndex,
            };
          }
          // 吻合的文字
          const fontMatch = test.slice(
            fontStartIndex,
            fontStartIndex + this.searchText.length,
          );
            // 吻合文字後的第一個字串 index
          const fontEndIndex = fontStartIndex + this.searchText.length;
          // 吻合文字之前的文字
          const fontStart = test.slice(0, fontStartIndex);
          // 吻合文字之後的文字
          const fontEnd = test.slice(fontEndIndex);

          return {
            fontStart,
            fontEnd,
            fontMatch,
            country: test,
            fontStartIndex,
          };
        })
        .sort((aft, bef) => aft.fontStartIndex - bef.fontStartIndex)
        .slice(0, 10);
    },
  },
  components: {
    menuIcon,
    settings,
  },
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
      transition: all 0.3s ease-in-out;
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
