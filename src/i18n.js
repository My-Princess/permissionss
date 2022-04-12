import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './locales/en.json'
import usLocal from './locales/zh-CN.json'
// import {enLocale,usLocal} from './locales/lang/index'
console.log('json全部文件',enLocale,usLocal)
Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale
  },
  cn: {
    ...usLocal
  }
}
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'cn',
  messages
})

export default i18n
