<template>
  <div class="home">
    <HomeNavbar class="home_navbar"
                @handler="changeSideBarShow"
                :countries="covid19Countries" />
    <HomeSideBar v-show="isSideBarShow"
                 @handler="changeSideBarShow" />
    <main class="home_wrapper"
          id="top">
      <section>
        <HomeChart :chartData="dataOptions"
                   :title="chartTitle" />
      </section>
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
          <template v-if="covid19SummaryGlobal.length">
            <BaseCol v-for="(data, index) in covid19SummaryGlobal"
                     :pc="4"
                     :pad="6"
                     :phone="12"
                     :key="data.name">
              <HomeItem :index="index"
                        :name="data.name"
                        :date="data.date"
                        :chineseName="data.chineseName"
                        :number="data.number" />
            </BaseCol>
          </template>
          <!-- 加載等待元件 -->
          <template v-else>
            <BaseCol v-for="data in 6"
                     :pc="4"
                     :pad="6"
                     :phone="12"
                     :key="data.name">
              <BaseLoadCard height="112px" />
            </BaseCol>
          </template>
        </BaseRow>
      </section>
      <section class="home_card_wrapper clearfix">
        <div class="home_card_selector">
          <span>排序：</span>
          <!-- element ui select -->
          <el-select v-model="sortItem"
                     placeholder="排序國家顯示順序"
                     :disabled="!!sortOption.length">
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
        <template v-if="pinCountriesData.length">
          <h2 class="home_text">收藏項目</h2>
          <template v-for="(data, index) in pinCountriesData">
            <BaseCard class="home_card"
                      v-bind="data"
                      :index="index"
                      :pin="true"
                      :key="data.country"
                      @handler="setPinCountriesData" />
          </template>
        </template>
        <template v-if="covid19CountriesSort.length">
          <h2 class="home_text">各國家資訊（不包含收藏項目）</h2>
          <template v-for="(data, index) in covid19CountriesSort">
            <BaseCard class="home_card"
                      v-bind="data"
                      :index="index"
                      :key="data.country"
                      @handler="pinCountriesData" />
          </template>
        </template>
        <!-- 加載等待元件 -->
        <template v-else>
          <BaseLoadCard :height="'196px'"
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
  import BaseCard from '@/components/Base/BaseCard.vue';
  import HomeSideBar from '@/components/Home/HomeSideBar.vue';
  import HomeChart from '../components/Home/HomeChart.js';
  import HomeSortbar from '@/components/Home/HomeSortbar.vue';
  import BaseCol from '@/components/Base/BaseCol.vue';
  import BaseRow from '@/components/Base/BaseRow.vue';
  import BaseLoadCard from '../components/Base/BaseLoadCard.vue';

  // svg
  import arrowCircle from '@/assets/img/arrow_circle_up-24px.svg';

  // mapGetter
  import { mapGetters } from 'vuex';

  export default {
    name: 'Home',
    components: {
      BaseRow,
      BaseCol,
      BaseLoadCard,
      BaseCard,
      HomeSortbar,
      HomeSideBar,
      HomeItem,
      HomeChart,
      HomeNavbar,
      arrowCircle,
    },
    data() {

      // todo: 取得用戶之前 pin 的城市資訊
      function pinValue() {
        return JSON.parse(localStorage.getItem('pinValue')) || [];
      }

      return {
        isSideBarShow: false,
        isLoading: true,
        sortItem: 'word',
        pinCountries: pinValue(),
        chartTitle: 'COVID-19 每日死亡國家排行',
        sortOption: [
          {
            value: 'word',
            label: '依字母排序',
          },
          {
            value: 'newConfirmed',
            label: '新增確診（多至少）',
          },
          {
            value: 'totalConfirmed',
            label: '累積確診（多至少）',
          },
          {
            value: 'newDeaths',
            label: '新增死亡（多至少）',
          },
          {
            value: 'totalDeaths',
            label: '累計死亡（多至少）',
          },
        ],
      };
    },
    computed: {
      ...mapGetters([
        'covid19SummaryGlobal',
        'covid19SummaryCountries',
        'covid19Countries',
      ]),
      // todo: 依照選擇排序國家順序
      covid19CountriesSort() {
        switch (this.sortItem) {
          case 'word':
            return this.noPinCountriesData.slice().sort();
          case 'newConfirmed':
          case 'totalDeaths':
          case 'totalConfirmed':
          case 'newDeaths':
            return this.noPinCountriesData.slice()
              .sort((firstElement, secondElement) =>
                  secondElement[this.sortItem] - firstElement[this.sortItem]);
          default:
            return this.noPinCountriesData;
        }
      },
      pinCountriesData() {
        return this.covid19SummaryCountries.filter(item => this.pinCountries.includes(item.country));
      },
      noPinCountriesData() {
        return this.covid19SummaryCountries.filter(item => !this.pinCountries.includes(item.country));
      },
      dataOptions() {
        const COUNTRY_COUNT = 10;
        const [BLUE, GREEN] = ['#ffffff90', '#19caad20'];
        const RANK_VALUE = 'totalDeaths';
        const sortData = this.covid19SummaryCountries.slice()
          .sort((firstElement, secondElement) =>
              secondElement[RANK_VALUE] - firstElement[RANK_VALUE])
          .slice(0, COUNTRY_COUNT);

        const color = Array(COUNTRY_COUNT).fill()
          .map((element, index) => index % 2 ? BLUE : GREEN);

        return {
          labels: sortData.map((data) => data.countryCode),
          datasets: [
            {
              backgroundColor: color,
              label: '死亡',
              data: sortData.map((data) => data[RANK_VALUE]),
            },
          ],
        };
      },
    },
    created() {
      // ! waiting for refactor
      this.$store.dispatch('getCovid19Summary');
      this.$store.dispatch('getCovid19Countries');
    },
    methods: {
      changeSideBarShow(data) {
        this.isSideBarShow = data;
      },
      setPinCountriesData(data) {
        this.pinCountries = this.pinCountries.includes(data)
          ? this.pinCountries.splice(this.pinCountries.indexOf(data), 1)
          : this.pinCountries.push(data);

        localStorage.setItem('pinValue', JSON.stringify(this.pinCountries));
      },
    },
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
        // ! 更好的方式？
        div:not(:nth-last-of-type(3)):not(:nth-last-of-type(2)):not(:last-of-type)
          * {
          margin-bottom: 12px;
        }
      }
    }

    &_card {
      margin-bottom: 12px;
    }

    &_card_selector {
      float: right;
      span {
        margin-right: 12px;
        @include font(lighter, 16px, $font-secondary);
        color: $font-dark;
      }
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
