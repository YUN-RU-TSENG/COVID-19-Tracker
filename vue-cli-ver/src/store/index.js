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
    COVID_19_Summary: [],
    COVID_19_Countries: [],
    COVID_19_CountryStatusFromDayOne: [],
    COVID_19_CountryAllStatusFromDayOne: [],
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
      const result = await GET_COVID_19_CountryStatusFromDayOne(country, status);
      commit("COVID_19_CountryStatusFromDayOne", result);
    },
    async API_COVID_19_CountryAllStatusFromDayOne({ commit }, country, startTime, endTime) {
      const result = await GET_COVID_19_CountryAllStatusFromDayOne(country, startTime, endTime);
      commit("COVID_19_CountryAllStatusFromDayOne", result);
    },
  },
});
