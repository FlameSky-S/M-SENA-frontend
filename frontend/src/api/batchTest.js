import request from '@/utils/request'

export function getSettings() {
  return request({
    url: '/presentationEnd/getSettings',
    method: 'get',
  })
}

export function getResults(query) {
  return request({
    url: '/presentationEnd/getResults',
    method: 'post',
    query,
  })
}
