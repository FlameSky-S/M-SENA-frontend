import { constantRoutes } from '@/router'

const state = { routes: [] }
const getters = {
  routes: (state) => state.routes,
}
const mutations = {
  setRoutes(state, routes) {
    // console.log('src/store/modules/routes.js/mutations/setRoutes')
    state.routes = constantRoutes.concat(routes)
  },
}
const actions = {
  async setRoutes({ commit }) {
    // console.log('src/store/modules/routes.js/actions/setRoutes')
    commit('setRoutes', [])
    return []
  },
}
export default { state, getters, mutations, actions }
