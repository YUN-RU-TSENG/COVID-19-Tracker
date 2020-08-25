<template>
  <div class="home">
    <HomeNavbar class="home_navbar"
                @handler="changeSideBarShow"
                @handlerNextPage="nextPage"
                :countries="$store.getters.covidNineteenCountries" />
    <HomeSideBar v-if="isSideBarShow"
                 @handler="changeSideBarShow" />
    <main class="home_wrapper"
          id="top">
      <section>
        <HomeChart :chartData="dataOptions" />
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
          <template v-if="$store.getters.covidNineteenSummaryGlobal.length">
            <BaseCol v-for="(data, index) in $store.getters.covidNineteenSummaryGlobal"
                     :pc="4"
                     :pad="6"
                     :phone="12"
                     :key="data.name">
              <HomeItem :name="data.name"
                        :date="data.date"
                        :index="index"
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
            <HomeCard class="home_card"
                      v-bind="data"
                      :index="index"
                      :pin="true"
                      :key="data.country"
                      @handler="pinCountriesData" />
          </template>
        </template>
        <template v-if="covidNineteenSummaryCountriesSort.length">
          <h2 class="home_text">各國家資訊（不包含收藏項目）</h2>
          <template v-for="(data, index) in covidNineteenSummaryCountriesSort">
            <HomeCard class="home_card"
                      v-bind="data"
                      :index="index"
                      :key="data.country"
                      @handler="pinCountriesData" />
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
  // ? 直接抽成 js 檔案，這種邏輯適用於哪種元素
  import HomeChart from '../components/Home/HomeChart.js';
  import HomeSortbar from '@/components/Home/HomeSortbar.vue';
  import BaseCol from '@/components/Base/BaseCol.vue';
  import BaseRow from '@/components/Base/BaseRow.vue';
  import BaseLoadCard from '../components/Base/BaseLoadCard.vue';

  // svg
  import arrowCircle from '@/assets/img/arrow_circle_up-24px.svg';

  // ! 之前體驗了不使用 mapgetter 之後的結論，使用的話會造成重新引用時程式碼過長，使用 mapgetter 雖然無法讓資料瞬間透過 this.$store 得知為 vuex 但是，按照 vuex 的寫法來嘬覺得更好，要改回 mapgetter 格式。
  export default {
    // ! 方法排序的固定？
    name: 'Home',
    created() {
      this.$store.dispatch('GET_covidNineteenSummary');
      this.$store.dispatch('GET_covidNineteenCountries');
    },
    data() {
      // 取 localStorage pin 數值
      // ! data 需要用的 fun 放在這裡比較多人做，但是在找為什麼建議都說放在這裡好？
      function pinValue() {
        return JSON.parse(localStorage.getItem('pinValue')) || [];
      }

      return {
        isSideBarShow: false,
        sortItem: 'word',
        pinCountries: pinValue(),
        // ? github 範例是寫成 null，但是會報錯。找出原因！
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
      // 依照選擇排序國家順序
      covidNineteenSummaryCountriesSort() {
        switch (this.sortItem) {
          // ? 預設為文字排序嗎？sort()？
          case 'word':
            return this.noPinCountriesDatas.slice().sort();
          case 'newConfirmed':
          case 'totalDeaths':
          case 'totalConfirmed':
          case 'newDeaths':
            // ! slice 的優勢為何？比起其他淺拷貝？
            return this.noPinCountriesDatas
              .slice()
              .sort((aft, bef) => bef[this.sortItem] - aft[this.sortItem]);
          default:
            return this.noPinCountriesDatas;
        }
      },
      noPinCountriesDatas() {
        return this.$store.getters.covidNineteenSummaryCountries.filter(
          (item) => !this.pinCountries.includes(item.country)
        );
      },
      pinCountriesDatas() {
        return this.$store.getters.covidNineteenSummaryCountries.filter((item) =>
          this.pinCountries.includes(item.country)
        );
      },
      dataOptions() {
        // ! 這裡的程式碼編排如何更加完善，其他人的做法普遍如何識別多重的 array 排版？
        // ? 這裡的邏輯上是使用 vuex 資料排序的結果，但是也有其他人做了排序，是否需要將排序抽成 computed 不用做兩次？
        const COUNTRY_COUNT = 10;
        const sortData = this.$store.getters.covidNineteenSummaryCountries
          .slice()
          .sort((a, b) => b['totalDeaths'] - a['totalDeaths'])
          .slice(0, COUNTRY_COUNT);
        const [BLUE, GREEN] = [ '#73aadd20', '#19caad20']
        const color = Array(COUNTRY_COUNT)
          .fill()
          .map((element, index) =>  (index % 2) ? BLUE : GREEN);
        return {
          // ! 這裡直接寫 map 是否不好
          labels: sortData.map((data) => data.countryCode),
          datasets: [
            {
              backgroundColor: color,
              label: '死亡',
              // ! 這裡直接寫 map 是否不好
              data: sortData.map((data) => data.totalDeaths),
            },
          ],
        };
      },
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
        }
        this.pinCountries.push(data);
        // ! 在這裡做儲存本地端資料這件事，需要額外的抽出嗎？一件事情嗎？
        localStorage.setItem('pinValue', JSON.stringify(this.pinCountries));
      },
    },
    components: {
      BaseLoadCard,
      HomeSortbar,
      BaseRow,
      BaseCol,
      HomeSideBar,
      HomeCard,
      HomeItem,
      HomeChart,
      HomeNavbar,
      arrowCircle,
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
