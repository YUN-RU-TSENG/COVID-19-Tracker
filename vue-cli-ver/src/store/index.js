import Vue from "vue";
import Vuex from "vuex";
import {
  GET_covidNighteenSummary,
  GET_covidNighteenCountries,
  GET_covidNighteenCountryStatusFromDayOne,
  GET_covidNighteenCountryAllStatusFromDayOne,
} from "@/service/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    covidNighteenSummary: {
      Global: {},
      Countries: [],
      Date: "",
    },
    covidNighteenCountries: [],
    covidNighteenCountryStatusFromDayOne: [],
    covidNighteenCountryAllStatusFromDayOne: [],
  },
  getters: {
    covidNighteenSummaryGlobal(state) {
      return Object.entries(state.covidNighteenSummary.Global).map((item) => {
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
          date: state.covidNighteenSummary.Date,
        };
      });
    },
    covidNighteenSummaryCountries(state) {
      return state.covidNighteenSummary.Countries.map((item) => {
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
    covidNighteenCountries(state) {
      return state.covidNighteenCountries;
    },
  },
  mutations: {
    covidNighteenSummary(state, datas) {
      state.covidNighteenSummary = datas;
    },
    covidNighteenCountries(state, datas) {
      state.covidNighteenCountries = datas;
    },
    covidNighteenCountryStatusFromDayOne(state, datas) {
      state.covidNighteenCountryStatusFromDayOne = datas;
    },
    covidNighteenCountryAllStatusFromDayOne(state, datas) {
      state.covidNighteenCountryAllStatusFromDayOne = datas;
    },
  },
  actions: {
    async GET_covidNighteenSummary({ commit }) {
      const result = await GET_covidNighteenSummary();
      commit("covidNighteenSummary", result);
    },
    async GET_covidNighteenCountries({ commit }) {
      const result = await GET_covidNighteenCountries();
      commit("covidNighteenCountries", result);
    },
    async GET_covidNighteenCountryStatusFromDayOne(
      { commit },
      country,
      status
    ) {
      const result = await GET_covidNighteenCountryStatusFromDayOne(
        country,
        status
      );
      commit("covidNighteenCountryStatusFromDayOne", result);
    },
    async GET_covidNighteenCountryAllStatusFromDayOne(
      { commit },
      country,
      startTime,
      endTime
    ) {
      const result = await GET_covidNighteenCountryAllStatusFromDayOne(
        country,
        startTime,
        endTime
      );
      commit("covidNighteenCountryAllStatusFromDayOne", result);
    },
  },
});
