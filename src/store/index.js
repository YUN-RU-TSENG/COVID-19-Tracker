import Vue from 'vue'
import Vuex from 'vuex'
import { GET_COVID19 } from '@/service/api.js'
// import { GET_COVID19, POST_COVID19, GET_COUNTRIES, POST_COUNTRIES } from '@/service/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    covid19Summary: {
      Global: {},
      Countries: [],
      Date: ''
    },
    covid19Countries: [],
    covid19CountryStatusFromDayOne: [],
    covid19CountryAllStatusFromDayOne: []
  },
  getters: {
    covid19SummaryGlobal (state) {
      return Object.entries(state.covid19Summary.Global).map((item) => {
        const [name, number] = item
        const translateName = {
          NewDeaths: '新增死亡',
          NewConfirmed: '新增確診',
          NewRecovered: '新增痊癒',
          TotalDeaths: '累計死亡',
          TotalConfirmed: '累計確診',
          TotalRecovered: '累計痊癒'
        }
        return {
          name,
          number,
          date: state.covid19Summary.Date,
          chineseName: translateName[name]
        }
      })
    },
    covid19SummaryCountries (state) {
      return state.covid19Summary.Countries.map((item) => {
        return {
          date: item.Date,
          country: item.Country,
          newDeaths: item.NewDeaths,
          totalDeaths: item.TotalDeaths,
          countryCode: item.CountryCode,
          newConfirmed: item.NewConfirmed,
          newRecovered: item.NewRecovered,
          totalConfirmed: item.TotalConfirmed,
          totalRecovered: item.TotalRecovered
        }
      })
    },
    covid19Countries (state) {
      return state.covid19Countries
    }
  },
  mutations: {
    GET_COVID19_SUMMARY (state, datas) {
      state.covid19Summary = datas
    },
    GET_COVID19_COUNTRIES (state, datas) {
      state.covid19Countries = datas
    },
    GET_COVID19_COUNTRY_STATUS_FROM_DAY_ONE (state, datas) {
      state.covid19CountryStatusFromDayOne = datas
    },
    GET_COVID19_COUNTRY_ALL_STATUS_FROM_DAY_ONE (state, datas) {
      state.covid19CountryAllStatusFromDayOne = datas
    }
  },
  actions: {
    // 返回所有地區每日最新數據、總數據
    async getCovid19Summary ({ commit }) {
      const result = await GET_COVID19('/summary')
      commit('GET_COVID19_SUMMARY', result.data)
    },
    // 返回所有地區名稱
    async getCovid19Countries ({ commit }) {
      const result = await GET_COVID19('/countries')
      commit('GET_COVID19_COUNTRIES', result.data)
    },
    // 返回一個地區至今的某類別自第一日到今日
    async getCovid19CountryStatusFromDayOne ({ commit }, country, status) {
      const result = await GET_COVID19(
        `/dayone/country/${country}/status/${status}`
      )
      commit('GET_COVID19_COUNTRY_STATUS_FROM_DAY_ONE', result.data)
    },
    // 返回一個國家特定時間內的資料
    async getCovid19CountryAllStatusFromDayOne (
      { commit },
      country,
      startTime,
      endTime
    ) {
      const result = await GET_COVID19(
        `/country/${country}?from=${startTime}&to=${endTime}`
      )
      commit('GET_COVID19_COUNTRY_ALL_STATUS_FROM_DAY_ONE', result.data)
    }
  }
})
