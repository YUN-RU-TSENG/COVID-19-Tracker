import Vue from "vue";
import Vuex from "vuex";
import {
  apiCovidNineteenSummary,
  apiCovidNineteenCountries,
  apiCovidNineteenCountryStatusFromDayOne,
  apiCovidNineteenCountryAllStatusFromDayOne,
} from "@/service/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    covidNineteenSummary: {
      Global: {},
      Countries: [],
      Date: "",
    },
    covidNineteenCountries: [],
    covidNineteenCountryStatusFromDayOne: [],
    covidNineteenCountryAllStatusFromDayOne: [],
  },
  getters: {
    covidNineteenSummaryGlobal(state) {
      return Object.entries(state.covidNineteenSummary.Global).map((item) => {
        const [name, number] = item;
        const translateName = {
          NewConfirmed: "新增確診",
          TotalConfirmed: "累計確診",
          NewDeaths: "新增死亡",
          TotalDeaths: "累計死亡",
          NewRecovered: "新增痊癒",
          TotalRecovered: "累計痊癒",
        };
        return {
          name,
          chineseName: translateName[name],
          number,
          date: state.covidNineteenSummary.Date,
        };
      });
    },
    covidNineteenSummaryCountries(state) {
      return state.covidNineteenSummary.Countries.map((item) => {
        return {
          country: item.Country,
          countryCode: item.CountryCode,
          date: item.Date,
          newConfirmed: item.NewConfirmed,
          newDeaths: item.NewDeaths,
          newRecovered: item.NewRecovered,
          totalConfirmed: item.TotalConfirmed,
          totalDeaths: item.TotalDeaths,
          totalRecovered: item.TotalRecovered,
        };
      });
    },
    covidNineteenCountries(state) {
      return state.covidNineteenCountries;
    },
  },
  mutations: {
    GET_COVID_NINETEEN_SUMMARY(state, datas) {
      state.covidNineteenSummary = datas;
    },
    GET_COVID_NINETEEN_COUNTRIES(state, datas) {
      state.covidNineteenCountries = datas;
    },
    GET_COVID_NINETEEN_COUNTRY_STATUS_FROME_DAY_ONE(state, datas) {
      state.covidNineteenCountryStatusFromDayOne = datas;
    },
    GET_COVID_NINETEEN_COUNTRY_ALL_STATUS_FROM_DAY_ONE(state, datas) {
      state.covidNineteenCountryAllStatusFromDayOne = datas;
    },
  },
  actions: {
    async GET_covidNineteenSummary({ commit }) {
      const result = await apiCovidNineteenSummary();
      commit("GET_COVID_NINETEEN_SUMMARY", result.data);
    },
    async GET_covidNineteenCountries({ commit }) {
      const result = await apiCovidNineteenCountries();
      commit("GET_COVID_NINETEEN_COUNTRIES", result.data);
    },
    async GET_covidNineteenCountryStatusFromDayOne(
      { commit },
      country,
      status
    ) {
      try {
        const result = await apiCovidNineteenCountryStatusFromDayOne({
          country,
          status,
        });
        commit("GET_COVID_NINETEEN_COUNTRY_STATUS_FROME_DAY_ONE", result.data);
      } catch (error) {
        console.error(error);
      }
    },
    async GET_covidNineteenCountryAllStatusFromDayOne(
      { commit },
      country,
      startTime,
      endTime
    ) {
      try {
        const result = await apiCovidNineteenCountryAllStatusFromDayOne({
          country,
          startTime,
          endTime,
        });
        commit(
          "GET_COVID_NINETEEN_COUNTRY_ALL_STATUS_FROM_DAY_ONE",
          result.data
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
});
