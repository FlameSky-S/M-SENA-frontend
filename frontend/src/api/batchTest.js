import request from '@/utils/request'

export function getSettings() {
  return request({
    url: '/presentationEnd/batchSettings',
    method: 'get',
  })
}

export function getResults(query) {
  return request({
    url: '/presentationEnd/batchResults',
    method: 'post',
    data: query,
  })
}
