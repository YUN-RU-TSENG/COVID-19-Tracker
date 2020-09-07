import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import NProgress from 'nprogress'
import { Select, DatePicker, Option } from 'element-ui'

Vue.component(Select.name, Select)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Option.name, Option)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
