<template>
  <div class="home">
    <HomeNavbar class="home_navbar"
                @handler="changeSideBarShow"
                @handlerNextPage="nextPage"
                :countries="$store.getters.covidNighteenCountries" />
    <HomeSideBar v-if="isSideBarShow"
                 @handler="changeSideBarShow" />
    <main class="home_wrapper"
          id="top">
      <section class="home_item">
        <h2 class="home_title">COVID-19 世界即時資訊</h2>
        <p class="home_text">
          嚴重特殊傳染性肺炎疫情，是一次由嚴重急性呼吸系統症候群冠狀病毒2型（SARS-CoV-2）所引發的全球大流行疫情。疫情最初在 2019 年 12 月於中華人民共和國湖北省武漢市被發現，隨後在 2020 年初迅速擴散至全球多國，逐漸變成一場全球性大瘟疫，被多個國際組織及傳媒形容為自第二次世界大戰以來全球面臨的最嚴峻危機（出自
          <a class="home_link"
             target="_blank"
             href="https://zh.wikipedia.org/wiki/2019%E5%86%A0%E7%8A%B6%E7%97%85%E6%AF%92%E7%97%85%E7%96%AB%E6%83%85#cite_note-346">維基</a>）。數據資料來源：<a class="home_link"
             target="_blank"
             href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a></p>
        <BaseRow class="home_item_container">
          <template v-if="$store.getters.covidNighteenSummaryGlobal.length">
            <BaseCol v-for="data in $store.getters.covidNighteenSummaryGlobal"
                     :pc="4"
                     :pad="6"
                     :phone="12"
                     :key="data.name">
              <transition name="slide-fade"
                          appear>
                <HomeItem :name="data.name"
                          :date="data.date"
                          :chineseName="data.chineseName"
                          :number="data.number" />
              </transition>
            </BaseCol>
          </template>
          <!-- 加載等待元件 -->
          <template v-else>
            <BaseCol v-for="data in 6"
                     :pc="4"
                     :pad="6"
                     :phone="12"
                     :key="data.name">
              <BaseLoadCard height="129px" />
            </BaseCol>
          </template>
        </BaseRow>
      </section>
      <section class="home_card_wrapper clearfix">
        <div class="home_card_selector">
          <span>排序：</span>
          <!-- element ui select -->
          <el-select v-model="sortItem"
                     placeholder="排序國家顯示順序">
            <el-option v-for="item in sortOption"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <h2 class="home_title">COVID-19 地區即時資訊</h2>
        <p class="home_text">查看各國地區詳細資訊。數據資料來源： <a class="home_link"
             target="_blank"
             href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a></p>
        <HomeSortbar class="home_sort" />
        <!-- pin資料 -->
        <template v-if="pinCountriesDatas.length">
          <h2 class="home_text">收藏項目</h2>
          <template v-for="(data, index) in pinCountriesDatas">
            <transition name="slide-fade"
                        appear
                        :key="data.country">
              <HomeCard class="home_card"
                        v-bind="data"
                        :index="index"
                        :pin="true"
                        @handler="pinCountriesData" />
            </transition>
          </template>
        </template>
        <template v-if="covidNighteenSummaryCountriesSort.length">
          <h2 class="home_text">各國家資訊（不包含收藏項目）</h2>
          <template v-for="(data, index) in covidNighteenSummaryCountriesSort">
            <transition name="slide-fade"
                        appear
                        :key="data.country">
              <HomeCard class="home_card"
                        v-bind="data"
                        :index="index"
                        @handler="pinCountriesData" />
            </transition>
          </template>
        </template>
        <!-- 加載等待元件 -->
        <template v-else>
          <BaseLoadCard height="196px"
                        v-for="data in 4"
                        class="home_card"
                        :key="data" />
        </template>
      </section>
    </main>
    <a href="#top"
       class="home_top_arrow"
       title="回到頂部">
      <arrowCircle />
    </a>
  </div>
</template>

<script>
  // component
  import HomeNavbar from '@/components/Home/HomeNavbar.vue';
  import HomeItem from '@/components/Home/HomeItem.vue';
  import HomeCard from '@/components/Home/HomeCard.vue';
  import HomeSideBar from '@/components/Home/HomeSideBar.vue';
  import BaseCol from '@/components/BaseCol.vue';
  import BaseRow from '@/components/BaseRow.vue';
  import HomeSortbar from '@/components/Home/HomeSortbar.vue';
  import BaseLoadCard from '../components/BaseLoadCard.vue';

  // svg
  import arrowCircle from '@/assets/img/arrow_circle_up-24px.svg';


  function pinValue() {
    return JSON.parse(localStorage.getItem('pinValue')) || [];
  }

  export default {
    name: 'Home',
    created() {
      this.$store.dispatch('GET_covidNighteenSummary');
      this.$store.dispatch('GET_covidNighteenCountries');
    },
    data() {
      return {
        isSideBarShow: false,
        sortItem: 'word',
        pinCountries: pinValue(),
        sortOption: [
          {
            value: 'word',
            label: '依字母排序'
          },
          {
            value: 'newConfirmed',
            label: '新增確診（多至少）'
          },
          {
            value: 'totalConfirmed',
            label: '累積確診（多至少）'
          },
          {
            value: 'newDeaths',
            label: '新增死亡（多至少）'
          },
          {
            value: 'totalDeaths',
            label: '累計死亡（多至少）'
          }
        ]
      };
    },
    computed: {
      // 依照選擇排序國家順序
      covidNighteenSummaryCountriesSort() {
        switch (this.sortItem) {
          case 'word':
            return this.noPinCountriesDatas.sort((aft, bef) => {
              const aftWord = aft.country
                .slice(0, 1)
                .toLowerCase()
                .charCodeAt();
              const befWord = bef.country
                .slice(0, 1)
                .toLowerCase()
                .charCodeAt();

              return aftWord - befWord;
            });
          case 'newConfirmed':
          case 'totalDeaths':
          case 'totalConfirmed':
          case 'newDeaths':
            return this.noPinCountriesDatas.sort(
              (aft, bef) => bef[this.sortItem] - aft[this.sortItem]
            );
          default:
            return this.noPinCountriesDatas;
        }
      },
      noPinCountriesDatas() {
        return this.$store.getters.covidNighteenSummaryCountries.filter(
          item => !this.pinCountries.includes(item.country)
        );
      },
      pinCountriesDatas() {
        return this.$store.getters.covidNighteenSummaryCountries.filter(item =>
          this.pinCountries.includes(item.country)
        );
      }
    },
    methods: {
      changeSideBarShow(data) {
        this.isSideBarShow = data;
      },
      nextPage(data) {
        this.$router.push({ name: 'country', params: { country: data } });
      },
      pinCountriesData(data) {
        if (this.pinCountries.includes(data)) {
          this.pinCountries.splice(this.pinCountries.indexOf(data), 1);
          localStorage.setItem('pinValue', JSON.stringify(this.pinCountries));
          return;
        } else {
          this.pinCountries.push(data);
          localStorage.setItem('pinValue', JSON.stringify(this.pinCountries));
        }
      }
    },
    components: {
      BaseLoadCard,
      HomeSortbar,
      BaseRow,
      BaseCol,
      HomeSideBar,
      HomeCard,
      HomeItem,
      HomeNavbar,
      arrowCircle
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    background-color: $theme-secondary;
    min-height: 100vh;
    font-size: 0;
    &_navbar {
      position: fixed;
      left: 0;
      right: 0;
      box-shadow: 0 0 10px $gray;
      z-index: 999;
    }
    &_wrapper {
      max-width: 960px;
      padding: 0px 12px;
      margin: 0 auto;
      padding-top: 80px;
    }
    &_sort {
      margin-bottom: 12px;
    }
    &_link {
      @include font(lighter, 12px, $font-secondary);
      color: $brand-primary;
      text-decoration: underline;
    }
    &_title {
      @include font(bold, 16px, $font-secondary);
      color: $font-dark;
      margin-bottom: 6px;
      svg {
        vertical-align: text-bottom;
        margin-left: 12px;
      }
    }
    &_text {
      @include font(lighter, 12px, $font-secondary);
      color: $font-dark;
      margin-bottom: 12px;
      text-align: justify;
    }
    &_item_container {
      margin-bottom: 24px;
      div:not(:last-of-type) > * {
        margin-bottom: 12px;
      }
      @include Mediaquery-pad {
        div:not(:last-of-type) > * {
          margin-bottom: 0px;
        }
        div:not(:nth-last-of-type(3)):not(:nth-last-of-type(2)):not(:last-of-type)
          * {
          margin-bottom: 12px;
        }
      }
      @include Mediaquery-pc {
        div:not(:last-of-type) > * {
          margin-bottom: 0px;
        }
        div:not(:nth-last-of-type(3)):not(:nth-last-of-type(2)):not(:last-of-type)
          * {
          margin-bottom: 12px;
        }
      }
    }
    &_card_selector {
      float: right;
      span {
        margin-right: 12px;
        @include font(lighter, 16px, $font-secondary);
        color: $font-dark;
      }
    }
    &_card {
      margin-bottom: 12px;
    }
    &_top_arrow {
      position: fixed;
      padding: 12px;
      bottom: 48px;
      right: 48px;
      background-color: $dark-transparent;
      border-radius: 4px;
      z-index: 999;
      svg {
        width: 24px;
        height: 24px;
        fill: $theme-primary;
      }
    }
  }
</style>
