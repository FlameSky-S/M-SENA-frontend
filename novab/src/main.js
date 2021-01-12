import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import App from './App.vue'
import router from './router'

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en' // 如使用中文,请删除

import './styles/index.scss' // global css

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  locale: enLang, // 如使用中文，请删除
})

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#m-sena-app')
