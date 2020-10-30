import request from '@/utils/request'

export function getDatasetList(data) {
  return request({
    url: '/dataEnd/getDatasetList',
    method: 'post',
    data,
  })
}

export function getUnlockedDatasetList(data) {
  return request({
    url: '/dataEnd/getUnlockedDatasetList',
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

// export function doDelete(data) {
//   return request({
//     url: '/table/doDelete',
//     method: 'post',
//     data,
//   })
// }
