import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/element-variables.scss'

Vue.use(ElementUI, {
  size: 'small',
  locale,
})
