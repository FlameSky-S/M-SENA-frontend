import { constantRoutes } from '@/router'

const state = { routes: [] }
const getters = {
  routes: (state) => state.routes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
}
const actions = {
  async setRoutes({ commit }) {
    commit('setRoutes', [])
    return []
  },
}
export default { state, getters, mutations, actions }
