import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/index.scss' // global css

import './plugins'

Vue.use(ElementUI, {
  size: 'small',
  locale: enLang,
})

Vue.config.productionTip = false

new Vue({
  el: '#m-sena-app',
  router,
  store,
  render: (h) => h(App),
})
