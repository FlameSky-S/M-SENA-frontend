import request from '@/utils/request'

export function getAllSettings() {
  return request({
    url: '/settings/getAllSettings',
    method: 'get',
  })
}

export function getFeatureExtractionTools() {
  return request({
    url: '/settings/getFeatureExtractionTools',
    method: 'get',
  })
}
