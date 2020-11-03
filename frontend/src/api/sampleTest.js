import request from '@/utils/request'

export function getSettings() {
  return request({
    url: '/presentationEnd/sampleSettings',
    method: 'get',
  })
}

export function getResults(query) {
  return request({
    url: '/presentationEnd/sampleResults',
    method: 'post',
    data: query,
  })
}
