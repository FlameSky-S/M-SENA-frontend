import request from '@/utils/request'

// Functions used in datasetDetails Page.
export function getDetails(data) {
  return request({
    url: '/dataEnd/getDetails',
    method: 'post',
    data,
  })
}

export function getMetaData(data) {
  return request({
    url: '/dataEnd/getMetaData',
    method: 'post',
    data,
  })
}

// Functions used in Labeling Details Page.
export function getLabelPageDetails(data) {
  return request({
    url: '/dataEnd/getLabelDetails',
    method: 'post',
    data,
  })
}

export function getLabelMetaData(data) {
  return request({
    url: '/dataEnd/getLabelMetaData',
    method: 'post',
    data,
  })
}
