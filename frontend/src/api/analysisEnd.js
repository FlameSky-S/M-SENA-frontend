import request from '@/utils/request'

export function batchResults(query) {
  return request({
    url: '/analysisEnd/batchResults',
    method: 'post',
    data: query,
  })
}

export function sampleResults(query) {
  return request({
    url: '/analysisEnd/sampleResults',
    method: 'post',
    data: query,
  })
}

export function runLive(query) {
  return request({
    url: '/analysisEnd/runLive',
    method: 'post',
    data: query,
  })
}

// export function getTranscript(query) {
//   return request({
//     url: '/analysisEnd/liveTranscript',
//     method: 'post',
//     data: query,
//   })
// }

export function getResults(data) {
  return request({
    url: '/analysisEnd/getResults',
    method: 'post',
    data,
  })
}

export function getResultDetails(data) {
  return request({
    url: '/analysisEnd/getResultDetails',
    method: 'post',
    data,
  })
}

export function getSampleDetails(data) {
  return request({
    url: '/analysisEnd/getSampleDetails',
    method: 'post',
    data,
  })
}

export function getFeatureDetails(data) {
  return request({
    url: '/analysisEnd/getFeatureDetails',
    method: 'post',
    data,
  })
}

export function setDefaultModel(data) {
  return request({
    url: '/analysisEnd/setDefaultModel',
    method: 'post',
    data,
  })
}

export function delResult(data) {
  return request({
    url: '/analysisEnd/delResult',
    method: 'post',
    data,
  })
}
