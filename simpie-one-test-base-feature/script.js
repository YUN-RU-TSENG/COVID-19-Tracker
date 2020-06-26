(function IIFE() {
  const COVID_19_API = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';
  const data = {
    COVID_19_Datas: [],
    filtersWord: '',
    branches: [
      {
        name: 'deaths',
        text: '死亡人數排序',
      },
      {
        name: 'cases',
        text: '生病人數排序',
      },
      {
        name: 'word',
        text: '國家字母排序',
      },
    ],
    currentBranch: 'deaths',
    isLoadFinish: false,
  };

  // 在找可不可以只傳入原始型別，但 v-for 不寫在根元素上呢？
  Vue.component('listItem', {
    props: {
      initialData: {
        type: String,
        required: true,
      },
      datas: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        currentData: this.initialData,
      };
    },
    watch: {
      currentData: {
        handler(value) {
          this.$emit('checkbox-event', value);
        },
      },
    },
    template: `
                <div>
                  <div class="form-check form-check-inline ml-3">
                    <label v-for="data in datas" class="form-check-label"
                          :for="data.name">
                      <input class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            :id="data.name"
                            :value="data.name"
                            v-model="currentData" />
                      {{ data.text }}</label>
                  </div>
                </div>`,
  });

  Vue.component('cardItem', {
    props: {
      todayCases: {
        type: Number,
        required: true,
      },
      todayDeaths: {
        type: Number,
        required: true,
      },
      cases: {
        type: Number,
        required: true,
      },
      deaths: {
        type: Number,
        required: true,
      },
      population: {
        type: Number,
        required: true,
      },
      updated: {
        type: Number,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    template: `
        <div class="col-lg-4 col-md-6">
          <transition name="slide-fade" appear>
            <div class="card mb-4 border-success">
              <h5 class="card-header">
                <strong>{{ index | DisplayArrayIndexNumber }}</strong>{{
                country }}
              </h5>
              <div class="card-body">
                <p class="card-text m-0">
                  今日確診人數: {{ todayCases | perThousandDisplay }}
                </p>
                <p class="card-text m-0">
                  今日逝世人數: {{ todayDeaths | perThousandDisplay
                  }}
                  <span class="badge badge-pill badge-danger">New</span>
                </p>
                <p class="card-text m-0">
                  逝世人數: {{ deaths | perThousandDisplay }}
                  <span class="badge badge-pill badge-warning">Total</span>
                </p>
                <p class="card-text m-0">
                  確診人數: {{ cases | perThousandDisplay }}
                </p>
                <p class="card-text m-0">
                  國家總人口: {{ population | perThousandDisplay }}
                </p>
                <p class="card-text m-0">
                  最後更新時間: {{ updated | timeFormateDisplay }}
                </p>
              </div>
            </div>
          </transition>
        </div>`,
    filters: {
      perThousandDisplay(number) {
        if (!parseInt(number, 10)) return '無 🏨';
        return parseInt(number, 10).toLocaleString('zh-TW', {
          style: 'decimal',
          useGrouping: true,
        });
      },
      DisplayArrayIndexNumber(number) {
        return `${parseInt(number, 10) + 1}. `;
      },
      timeFormateDisplay(time) {
        const currentTime = new Date();
        const dataTime = new Date(time);
        const passTime = currentTime.getTime() - dataTime.getTime();
        const countMinuteTime = 1000 * 60;
        return `${Math.ceil(passTime / countMinuteTime)} 分鐘前 📃`;
      },
    },
  });

  const vm = new Vue({
    el: '#app',
    data,
    created() {
      NProgress.start();
      this.fetchAPIData(COVID_19_API).then(() => {
        NProgress.done();
        this.isLoadFinish = true;
      });
    },
    computed: {
      totalCases() {
        return this.COVID_19_Datas.reduce(
          (acc, cur) => acc + parseInt(cur.cases, 10),
          0
        );
      },
      totalDeaths() {
        return this.COVID_19_Datas.reduce(
          (acc, cur) => acc + parseInt(cur.deaths, 10),
          0
        );
      },
      COVID_19_DatasFilter() {
        if (!this.filtersWord) return this.COVID_19_Datas;
        return this.COVID_19_Datas.filter((item) => {
          const regExp = new RegExp(this.filtersWord, 'i');
          return regExp.test(item.country) ? item : undefined;
        });
      },
      COVID_19_DatasFilterTotalCases() {
        return this.COVID_19_DatasFilter.length;
      },
      COVID_19_DatasFilterRank() {
        switch (this.currentBranch) {
          case 'word':
            return this.COVID_19_DatasFilter.slice().sort((aft, bef) => {
              const aftWord = aft.country.slice(0, 1).toLowerCase().charCodeAt();
              const befWord = bef.country.slice(0, 1).toLowerCase().charCodeAt();

              return aftWord - befWord;
            });
          case 'deaths':
          case 'cases':
            return this.COVID_19_DatasFilter.slice().sort(
              (aft, bef) => bef[this.currentBranch] - aft[this.currentBranch]
            );
        }
      },
    },
    filters: {
      perThousandDisplay(number) {
        if (!parseInt(number, 10)) return '無 🏨';
        return parseInt(number, 10).toLocaleString('zh-TW', {
          style: 'decimal',
          useGrouping: true,
        });
      },
      DisplayArrayIndexNumber(number) {
        return `${parseInt(number, 10) + 1}. `;
      },
      timeFormateDisplay(time) {
        const currentTime = new Date();
        const dataTime = new Date(time);
        const passTime = currentTime.getTime() - dataTime.getTime();
        const countMinuteTime = 1000 * 60;
        return `${Math.ceil(passTime / countMinuteTime)} 分鐘前 📃`;
      },
    },
    methods: {
      fetchAPIData(API) {
        return fetch(API)
          .then((response) => response.json())
          .then((responseData) => {
            this.COVID_19_Datas = responseData;
          })
          .catch((error) => console.error(error));
      },
      setFiltersWord(e) {
        this.filtersWord = e.target.firstElementChild.value;
      },
      setFiltersWordInput(e) {
        this.filtersWord = e.target.value.trim();
      },
      sortCovid_19(value) {
        this.currentBranch = value;
      },
    },
  });
}());
