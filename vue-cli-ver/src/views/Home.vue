<template>
  <div class="home">
    <BaseNavbar class="home_navbar"
                @handler="changeSideBarShow" />
    <BaseSideBar v-if="isSideBarShow"
                 @handler="changeSideBarShow" />
    <main class="home_wrapper"
          id="top">
      <h2 class="home_title">新冠肺炎世界今日資訊</h2>
      <p class="home_text">由約翰霍普金斯所提供的訊息</p>
      <BaseRow class="home_baseItem_container">
        <BaseCol v-for="data in $store.getters.COVID_19_SummaryGlobal"
                 :pad="6"
                 :phone="12"
                 :key="data.name">
          <transition name="slide-fade"
                      appear>
            <BaseItem :name="data.name"
                      :date="data.date"
                      :chineseName="data.chineseName"
                      :number="data.number" />
          </transition>
        </BaseCol>

      </BaseRow>
      <h2 class="home_title">新冠肺炎各國地區資訊</h2>
      <p class="home_text">由約翰霍普金斯所提供的訊息</p>
      <BaseSortbar class="home_sort" />
      <BaseRow class="home_baseCard_container">
        <BaseCol v-for="date in $store.getters.COVID_19_SummaryCountries"
                 :key="date.country"
                 :default="12">
          <transition name="slide-fade"
                      appear>
            <BaseCard :country="date.country"
                      :countryCode="date.countryCode"
                      :date="date.date"
                      :newConfirmed="date.newConfirmed"
                      :newDeaths="date.newDeaths"
                      :newRecovered="date.newRecovered"
                      :totalConfirmed="date.totalConfirmed"
                      :totalDeaths="date.totalDeaths"
                      :totalRecovered="date.totalRecovered" />
          </transition>
        </BaseCol>

      </BaseRow>
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
  import BaseNavbar from '@/components/BaseNavbar.vue';
  import BaseItem from '@/components/BaseItem.vue';
  import BaseCard from '@/components/BaseCard.vue';
  import BaseSideBar from '@/components/BaseSideBar.vue';
  import BaseCol from '@/components/BaseCol.vue';
  import BaseRow from '@/components/BaseRow.vue';
  import BaseSortbar from '@/components/BaseSortbar.vue';

  // svg
  import arrowCircle from '@/assets/img/arrow_circle_up-24px.svg';

  export default {
    name: 'Home',
    created() {
      this.$store.dispatch('API_COVID_19_Summary');
      this.$store.dispatch('API_COVID_19_Countries');
    },
    data() {
      return {
        isSideBarShow: false
      };
    },
    methods: {
      changeSideBarShow(data) {
        this.isSideBarShow = data;
      }
    },
    components: {
      BaseSortbar,
      BaseRow,
      BaseCol,
      BaseSideBar,
      BaseCard,
      BaseItem,
      BaseNavbar,
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
    &_sort{
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