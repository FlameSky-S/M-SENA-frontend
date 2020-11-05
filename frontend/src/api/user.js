import request from '@/utils/request'
import { tokenName } from '@/config/settings'

export async function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}
