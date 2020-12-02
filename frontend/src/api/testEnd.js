import request from '@/utils/request'

export function batchResults(query) {
  return request({
    url: '/presentationEnd/batchResults',
    method: 'post',
    data: query,
  })
}

export function sampleResults(query) {
  return request({
    url: '/presentationEnd/sampleResults',
    method: 'post',
    data: query,
  })
}

export function liveResults(query) {
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
