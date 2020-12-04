import request from '@/utils/request'

export function getDatasetList(data) {
  return request({
    url: '/dataEnd/getDatasetList',
    method: 'post',
    data,
  })
}

// export function doEdit(data) {
//   return request({
//     url: '/table/doEdit',
//     method: 'post',
//     data,
//   })
// }

export function deleteDataset(datasetIndexs) {
  return request({
    url: '/dataEnd/deleteDataset',
    method: 'post',
    data: datasetIndexs,
  })
}
