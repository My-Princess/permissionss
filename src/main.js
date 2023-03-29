import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import uploader from 'vue-simple-uploader'
import BaiduMap from 'vue-baidu-map'
// import BaiduMap from "vue-baidu-map/components/map/Map.vue";

import router from './router'
import store from './store'
import i18n from "./i18n";
import './plugins/element.js'
import "./router/permission"
import "./assets/css/index.scss"
// import login from "./utils/LoginDialog"
import theConfirm from './utils/dialog'
import dlsConfirm from '@/utils/dlsConfirm'
// import selectDirectives from './directive/index'
// import echarts from 'echarts'
// Vue.prototype.$login = login.install; // 全局可使用this.$login调用
Vue.prototype.$theConfirm = theConfirm
// Vue.prototype.$dlsConfirm = dlsConfirm
Vue.use(BaiduMap, {
  ak: 'rYQHrpflPVCbHNRv7GPHO9QiA8Vlltsk'
})
Vue.use(dlsConfirm)
Vue.use(uploader)
// Vue.use(selectDirectives)

Vue.config.productionTip = false
// Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
