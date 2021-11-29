import request from '@/utils/request'

export function getDatasetList(data) {
  return request({
    url: '/dataEnd/getDatasetList',
    method: 'post',
    data,
  })
}

export function scanDatasets(data) {
  return request({
    url: '/dataEnd/scanDatasets',
    method: 'post',
    data,
  })
}

export function updateDataset(data) {
  return request({
    url: '/dataEnd/updateDataset',
    method: 'post',
    data,
  })
}

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

export function unlockDataset(data) {
  // data: datasetName (primary key)
  return request({
    url: '/dataEnd/unlockDataset',
    method: 'post',
    data,
  })
}

export function lockDataset(data) {
  // data: datasetName (primary key)
  return request({
    url: '/dataEnd/lockDataset',
    method: 'post',
    data,
  })
}
