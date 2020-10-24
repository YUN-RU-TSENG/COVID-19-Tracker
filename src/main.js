import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Select, DatePicker, Option, Button } from 'element-ui'

Vue.component(Select.name, Select)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Option.name, Option)
Vue.component(Button.name, Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
