import request from '@/utils/request'

export function getSettings() {
  return request({
    url: '/presentationEnd/liveSettings',
    method: 'get',
  })
}

export function getResults(query) {
  return request({
    url: '/presentationEnd/liveResults',
    method: 'post',
    data: query,
  })
}

export function getTranscript(query) {
  return request({
    url: '/presentationEnd/liveTranscript',
    method: 'post',
    data: query,
  })
}
