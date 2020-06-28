import Vue from "vue";
import Vuex from "vuex";
import Api from "@/service/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    covid_19_datas: [],
  },
  mutations: {
    SET_COVID_19_DATA(state, datas) {
      state.covid_19_datas = datas;
    },
  },
  actions: {
    getCovid_19_data({ commits }) {
      return Api().then((response) => {
        commits("SET_COVID_19_DATA", response);
      });
    },
  },
});
