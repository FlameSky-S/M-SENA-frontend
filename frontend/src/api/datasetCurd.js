import request from '@/utils/request'

export function createDataset(data) {
  // data: dataset_path
  return request({
    url: '/dataEnd/addDataset',
    method: 'post',
    data,
  })
}

export function deleteDataset(data) {
  // data: datasetName (primary key)
  return request({
    url: '/dataEnd/deleteDataset',
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
