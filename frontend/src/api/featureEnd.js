import request from '@/utils/request'

export function getFeatureList(data) {
  return request({
    url: '/featureEnd/getFeatureList',
    method: 'post',
    data,
  })
}

export function scanDefaultFeatures(data) {
  return request({
    url: '/featureEnd/scanDefaultFeatures',
    method: 'post',
    data,
  })
}

export function removeInvalidFeatures() {
  return request({
    url: '/featureEnd/removeInvalidFeatures',
    method: 'get',
  })
}

export function removeFeatures(data) {
  return request({
    url: '/featureEnd/removeFeatures',
    method: 'post',
    data,
  })
}

export function getFeatureArgs(data) {
  return request({
    url: '/featureEnd/getFeatureArgs',
    method: 'post',
    data,
  })
}

export function startExtracting(data) {
  return request({
    url: '/featureEnd/startExtracting',
    method: 'post',
    data,
  })
}

export function getFeatureListforTraining(data) {
  return request({
    url: '/featureEnd/getFeatureListforTraining',
    method: 'post',
    data,
  })
}
