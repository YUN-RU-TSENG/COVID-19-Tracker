<template>
  <div class="home">
    <HomeNavbar class="home_navbar"
                @handler="changeSideBarShow"
                @handlerNextPage="nextPage"
                :countries="$store.getters.COVID_19_Countries" />
    <HomeSideBar v-if="isSideBarShow"
                 @handler="changeSideBarShow" />
    <main class="home_wrapper"
          id="top">
      <section class="home_baseItem">
        <h2 class="home_title">新冠肺炎世界今日資訊</h2>
        <p class="home_text">由約翰霍普金斯所提供的訊息</p>
        <BaseRow class="home_baseItem_container">
          <BaseCol v-for="data in $store.getters.COVID_19_SummaryGlobal"
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
        </BaseRow>
      </section>
      <section class="home_baseCard clearfix">
        <div class="home_baseCard_selector">
          <span>排序：</span>
          <el-select v-model="sortItem"
                   placeholder="排序國家顯示順序"
                   >
          <el-option v-for="item in sortOption"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        </div>
        <h2 class="home_title">新冠肺炎各國地區資訊</h2>
        <p class="home_text">由約翰霍普金斯所提供的訊息</p>
        <HomeSortbar class="home_sort" />
        <BaseRow class="home_baseCard_container">
          <BaseCol v-for="(data, index) in COVID_19_SummaryCountriesSort"
                   :key="data.country"
                   :default="12">
            <transition name="slide-fade"
                        appear>
              <!-- 方案一 -->
              <HomeCard :country="data.country"
                        :countryCode="data.countryCode"
                        :date="data.date"
                        :newConfirmed="data.newConfirmed"
                        :newDeaths="data.newDeaths"
                        :newRecovered="data.newRecovered"
                        :totalConfirmed="data.totalConfirmed"
                        :totalDeaths="data.totalDeaths"
                        :totalRecovered="data.totalRecovered"
                        :index="index" />
              <!-- 方案二 -->
              <!-- 哪種方式更容易識別？ -->
              <!-- <HomeCard v-bind="data" /> -->
            </transition>
          </BaseCol>
        </BaseRow>
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

  // svg
  import arrowCircle from '@/assets/img/arrow_circle_up-24px.svg';

  import NProgress from 'nprogress';
  import '@/assets/nprogress.css';

  export default {
    name: 'Home',
    async created() {
      NProgress.start();
      await this.$store.dispatch('GET_COVID_19_Summary');
      await this.$store.dispatch('GET_COVID_19_Countries');
      NProgress.done();
    },
    data() {
      return {
        isSideBarShow: false,
        sortItem: 'word',
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
      COVID_19_SummaryCountriesSort() {
          switch (this.sortItem) {
            case 'word':
              return this.$store.getters.COVID_19_SummaryCountries.slice().sort((aft, bef) => {
                const aftWord = aft.country.slice(0, 1).toLowerCase().charCodeAt();
                const befWord = bef.country.slice(0, 1).toLowerCase().charCodeAt();

                return aftWord - befWord;
              });
            case 'newConfirmed':
            case 'totalDeaths':
            case 'totalConfirmed':
            case 'newDeaths':
              return this.$store.getters.COVID_19_SummaryCountries.slice().sort(
                (aft, bef) => bef[this.sortItem] - aft[this.sortItem]
              );
            default:
              return this.$store.getters.COVID_19_SummaryCountries
          }
      }
    },
    methods: {
      changeSideBarShow(data) {
        this.isSideBarShow = data;
      },
      nextPage(data) {
        this.$router.push({ name: 'country', params: { country: data } });
      }
    },
    components: {
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
    &_title {
      @include font(bold, 16px, $font-secondary);
      color: $font-dark;
      padding-left: 12px;
      margin-bottom: 6px;
      svg {
        vertical-align: text-bottom;
        margin-left: 12px;
      }
    }
    &_text {
      @include font(lighter, 12px, $font-secondary);
      color: $font-dark;
      padding-left: 12px;
      margin-bottom: 12px;
    }
    &_baseItem_container {
      margin-bottom: 24px;
      div:not(:last-of-type) * {
        margin-bottom: 24px;
      }
      @include Mediaquery-pad {
        div:not(:last-of-type) * {
          margin-bottom: 0px;
        }
        div:not(:nth-last-of-type(3)):not(:nth-last-of-type(2)):not(:last-of-type)
          * {
          margin-bottom: 24px;
        }
      }
      @include Mediaquery-pc {
        div:not(:last-of-type) * {
          margin-bottom: 0px;
        }
        div:not(:nth-last-of-type(3)):not(:nth-last-of-type(2)):not(:last-of-type)
          * {
          margin-bottom: 24px;
        }
      }
    }
    &_baseCard_selector {
      float: right;
      span{
        margin-right: 12px;
        @include font(lighter, 16px, $font-secondary);
        color: $font-dark;
      }
    }
    &_baseCard_container {
      div * {
        margin-bottom: 24px;
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
