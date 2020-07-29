import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Select, DatePicker, Option } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/assets/plugin/element-variables.scss'
import '@/assets/plugin/vue-transition.scss'

Vue.component(Select.name, Select);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Option.name, Option);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
