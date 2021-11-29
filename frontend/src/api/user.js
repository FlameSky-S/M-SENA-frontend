import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export function verifyToken(data) {
  return request({
    url: '/user/verifyToken',
    method: 'post',
    data,
  })
}

export function getUserList(data) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    data,
  })
}

export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data,
  })
}
