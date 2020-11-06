/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { getAccessToken, setAccessToken } from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config/settings'

const state = {
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  permissions: [],
}
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
}
const mutations = {
  setAccessToken(state, accessToken) {
    console.log('src/store/modules/user.js/mutations/setAccessToken')
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    console.log('src/store/modules/user.js/mutations/setUsername')
    state.username = username
  },
  setAvatar(state, avatar) {
    console.log('src/store/modules/user.js/mutations/setAvatar')
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    console.log('src/store/modules/user.js/mutations/setPermissions')
    state.permissions = permissions
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    console.log('src/store/modules/user.js/actions/setPermissions')
    commit('setPermissions', permissions)
  },
  async getUserInfo({ commit, state }) {
    console.log('src/store/modules/user.js/actions/getUserInfo')
    let { permissions, username, avatar } = {
      permissions: ['admin'],
      username: 'admin',
      avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
    }
    if (permissions && username && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
}
export default { state, getters, mutations, actions }
