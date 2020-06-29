import Vue from "vue";
import Vuex from "vuex";
import {
  GET_COVID_19_Summary,
  GET_COVID_19_Countries,
  GET_COVID_19_CountryStatusFromDayOne,
  GET_COVID_19_CountryAllStatusFromDayOne,
} from "@/service/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    COVID_19_Summary: {
      Global: {},
      Countries: [],
      Date: "",
    },
    COVID_19_Countries: [],
    COVID_19_CountryStatusFromDayOne: [],
    COVID_19_CountryAllStatusFromDayOne: [],
  },
  getters: {
    COVID_19_SummaryGlobal(state) {
      return Object.entries(state.COVID_19_Summary.Global).map((item) => {
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
          date: new Date(state.COVID_19_Summary.Date),
        };
      });
    },
    COVID_19_SummaryCountries(state) {
      return state.COVID_19_Summary["Countries"].map((item) => {
        const {
          Country: country,
          CountryCode: countryCode,
          Date: date,
          NewConfirmed: newConfirmed,
          NewDeaths: newDeaths,
          NewRecovered: newRecovered,
          TotalConfirmed: totalConfirmed,
          TotalDeaths: totalDeaths,
          TotalRecovered: totalRecovered,
        } = item;
        return {
          country,
          countryCode,
          date: new Date(date),
          newConfirmed,
          newDeaths,
          newRecovered,
          totalConfirmed,
          totalDeaths,
          totalRecovered,
        };
      });
    },
  },
  mutations: {
    COVID_19_Summary(state, datas) {
      state.COVID_19_Summary = datas;
    },
    COVID_19_Countries(state, datas) {
      state.COVID_19_Countries = datas;
    },
    COVID_19_CountryStatusFromDayOne(state, datas) {
      state.COVID_19_CountryStatusFromDayOne = datas;
    },
    COVID_19_CountryAllStatusFromDayOne(state, datas) {
      state.COVID_19_CountryAllStatusFromDayOne = datas;
    },
  },
  actions: {
    async API_COVID_19_Summary({ commit }) {
      const result = await GET_COVID_19_Summary();
      commit("COVID_19_Summary", result);
    },
    async API_COVID_19_Countries({ commit }) {
      const result = await GET_COVID_19_Countries();
      commit("COVID_19_Countries", result);
    },
    async API_COVID_19_CountryStatusFromDayOne({ commit }, country, status) {
      const result = await GET_COVID_19_CountryStatusFromDayOne(
        country,
        status
      );
      commit("COVID_19_CountryStatusFromDayOne", result);
    },
    async API_COVID_19_CountryAllStatusFromDayOne(
      { commit },
      country,
      startTime,
      endTime
    ) {
      const result = await GET_COVID_19_CountryAllStatusFromDayOne(
        country,
        startTime,
        endTime
      );
      commit("COVID_19_CountryAllStatusFromDayOne", result);
    },
  },
});
