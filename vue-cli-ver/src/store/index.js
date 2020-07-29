import Vue from "vue";
import Vuex from "vuex";
import {
  GET_covidNineteenSummary,
  GET_covidNineteenCountries,
  GET_covidNineteenCountryStatusFromDayOne,
  GET_covidNineteenCountryAllStatusFromDayOne,
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
    covidNineteenSummary(state, datas) {
      state.covidNineteenSummary = datas;
    },
    covidNineteenCountries(state, datas) {
      state.covidNineteenCountries = datas;
    },
    covidNineteenCountryStatusFromDayOne(state, datas) {
      state.covidNineteenCountryStatusFromDayOne = datas;
    },
    covidNineteenCountryAllStatusFromDayOne(state, datas) {
      state.covidNineteenCountryAllStatusFromDayOne = datas;
    },
  },
  actions: {
    async GET_covidNineteenSummary({ commit }) {
      const result = await GET_covidNineteenSummary();
      commit("covidNineteenSummary", result);
    },
    async GET_covidNineteenCountries({ commit }) {
      const result = await GET_covidNineteenCountries();
      commit("covidNineteenCountries", result);
    },
    async GET_covidNineteenCountryStatusFromDayOne(
      { commit },
      country,
      status
    ) {
      const result = await GET_covidNineteenCountryStatusFromDayOne(
        country,
        status
      );
      commit("covidNineteenCountryStatusFromDayOne", result);
    },
    async GET_covidNineteenCountryAllStatusFromDayOne(
      { commit },
      country,
      startTime,
      endTime
    ) {
      const result = await GET_covidNineteenCountryAllStatusFromDayOne(
        country,
        startTime,
        endTime
      );
      commit("covidNineteenCountryAllStatusFromDayOne", result);
    },
  },
});
