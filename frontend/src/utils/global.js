// import * as lodash from 'lodash'

const install = (Vue, opts = {}) => {
  /* 全局lodash */
  // Vue.prototype.$baseLodash = lodash
  /* 全局事件总线 */
  Vue.prototype.$baseEventBus = new Vue()
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
