<template>
  <div class="information">
    <header class="information_header">
      <a class="information_link"
         target="_blank"
         href
         @click.prevent="$router.push({ name: 'home'})">回前頁｜</a>
    </header>
    <main class="information_wrapper"
          id="top">
      <!-- section 每隔的下面都要有 24 px 間距，但是要如何命名合適？之前都是用 banner 等等中性名稱，但是這個區塊不好取名 -->
      <section>
        <h2 class="information_title">{{ $route.params.country | displayText }} COVID-19 詳細資訊</h2>
        <p class="information_text">國家人口介紹、土地面積介紹。</p>
        <BaseCard class="information_card" v-bind="covid19SummaryCountriesOne" :isPin="false" v-if="Object.keys(covid19SummaryCountriesOne) !== 0"/>
      </section>
      <section class="information_search">
        <h2 class="information_title">進階搜尋</h2>
        <p class="information_text">可選擇詳細資訊，進一步搜尋時間內該國罹病人口等詳細訊息：📊</p>
        <!-- 因為這個區塊有許多東西，也是一個邏輯。等待抽出 -->
        <el-date-picker v-model="searchDay"
                        type="daterange"
                        start-placeholder="開始日期"
                        end-placeholder="結束日期"
                        :picker-options="pickerOptions"
                        size="large">
        </el-date-picker>
        <el-button icon="el-icon-search"
                   circle
                   @click="searchCountryData"
                   class="information_button"></el-button>
        <InformationChart :chartData="dataOptions"
                          :title="chartTitle"
                          v-if="isLoaded" />
      </section>
    </main>
  </div>
</template>

<script>
  /* eslint-disable */
  // component
  import BaseCard from '@/components/Base/BaseCard.vue';
  import InformationChart from '@/components/Information/InformationChart.js';

  // mapGetter
  import { mapGetters } from 'vuex';

  // dayjs formate
  import { displayDayElementUIDatePicker } from '@/service/dayFormate';

  // api
  import { GET_COVID19 } from '@/service/api.js';

  export default {
    name: 'Information',
    components: {
      BaseCard,
      InformationChart,
    },
    filters: {
      displayText(data) {
        return data.toUpperCase();
      },
    },
    data() {
      return {
        isLoaded: false,
        searchDay: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        chartTitle: 'COVID-19',
        dataOptions: {
          labels: [],
          datasets: [],
        },
      };
    },
    computed: {
      ...mapGetters(['covid19SummaryCountries']),
      covid19SummaryCountriesOne(){
        return this.covid19SummaryCountries.filter(country => country.country === this.$route.params.country)
      }
    },
    methods: {
      // ! 等待修復的一坨爛代碼，拆分一件事一件事，送資料、轉換格式、等待
      async searchCountryData() {
        try {
          // 請求 api 查詢時間內日期
          const [startDay, endDay] = this.searchDay.map((day) =>
            displayDayElementUIDatePicker(day)
          );
          const { data: searchResult } = await GET_COVID19(
            `country/${this.$route.params.countrySlug}?from=${startDay}&to=${endDay}`
          );

          // 例外情況：當查詢失敗報錯
          // 請求回來後，將資料帶入到本來的 this.xxx 中，由於是不需要使用 vuex 的資料，所以不用 vuex。
          let searchDataFormate = searchResult.reduce((accumulator, currentValue) => {
            // 當物件沒有該數值，則新增
            if (accumulator[currentValue.Date]) {
              accumulator[currentValue.Date].Confirmed += currentValue.Confirmed;
              accumulator[currentValue.Date].Recovered += currentValue.Recovered;
              accumulator[currentValue.Date].Deaths += currentValue.Deaths;
            } else {
              accumulator[currentValue.Date] = {
                Country: currentValue.Country,
                CountryCode: currentValue.CountryCode,
                Province: '',
                City: '',
                CityCode: '',
                Lat: '',
                Lon: '',
                Confirmed: currentValue.Confirmed,
                Deaths: currentValue.Deaths,
                Recovered: currentValue.Recovered,
                Active: currentValue.Active,
                Date: currentValue.Date,
              };
            }
            return accumulator;
            // 當物件有當日資料、其他資料也為該日期，則人數總和
          }, {})

          searchDataFormate = Object.values(searchDataFormate)

          let result = {
            labels: [],
            datasets: [],
          };

          result.labels = Array(searchDataFormate.length)
            .fill()
            .map((item, index) => `day${index + 1}`);
          result.datasets = searchDataFormate.reduce(
            (accumulator, currentValue) => {
              accumulator[0].data.push(currentValue.Deaths);
              accumulator[1].data.push(currentValue.Recovered);
              accumulator[2].data.push(currentValue.Confirmed);

              return accumulator;
            },
            [
              {
                label: 'deaths',
                borderColor: '#af545c90',
                backgroundColor: '#af545c50',
                data: [],
              },
              {
                label: 'recovered',
                borderColor: '#38bda070',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [],
              },
              {
                label: 'confirmed',
                borderColor: '#73aadd70',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [],
              },
            ]
          );

          this.dataOptions = result;
          this.isLoaded = true;

        } catch (error) {
          console.error(error);
        }
      },
    },
    async created() {
      this.$store.dispatch('getCovid19Summary')
    },
  };
</script>

<style lang="scss" scoped>
  .information {
    background-color: $theme-secondary;
    min-height: 100vh;
    font-size: 0;

    &_header {
      padding: 24px 24px;
    }

    &_wrapper {
      max-width: 960px;
      padding: 0px 12px;
      margin: 0 auto;

      section:not(:last-child) {
        margin-bottom: 24px;
      }
    }

    &_link {
      @include font(lighter, 12px, $font-secondary);
      color: $font-dark;
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

    &_search {
      > button,
      div.el-input {
        margin-right: 12px;
      }
    }

    &_text {
      @include font(lighter, 12px, $font-secondary);
      color: $font-dark;
      margin-bottom: 12px;
      text-align: justify;
    }

    &_button {
      margin-left: 12px;
    }
  }
</style>
