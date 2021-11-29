const state = {
  user: null,
  isAdmin: false,
}
const getters = {
  user: (state) => state.user,
  isAdmin: (state) => state.isAdmin,
}
const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setAdmin: (state, isAdmin) => {
    state.isAdmin = isAdmin
  },
}
const actions = {
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  setAdmin({ commit }, isAdmin) {
    commit('setAdmin', isAdmin)
  },
}
export default { state, getters, mutations, actions }
