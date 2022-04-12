import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from "./i18n";
import './plugins/element.js'
import "./router/permission"
import "./assets/css/index.scss"
// import echarts from 'echarts'
Vue.config.productionTip = false
// Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
