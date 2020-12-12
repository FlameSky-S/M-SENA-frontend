import request from '@/utils/request'

export function getDatasetList(data) {
  return request({
    url: '/dataEnd/getDatasetList',
    method: 'post',
    data,
  })
}

export function scanDatasets() {
  return request({
    url: '/dataEnd/scanDatasets',
    method: 'get',
  })
}
