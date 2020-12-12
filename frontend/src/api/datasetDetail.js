import request from '@/utils/request'

// Functions used in datasetDetails Page.
export function getDetails(data) {
  return request({
    url: '/dataEnd/getDetails',
    method: 'post',
    data,
  })
}

// export function getVideoFilters(data) {
//   return request({
//     url: '/dataEnd/getVideoFilters',
//     method: 'post',
//     data,
//   })
// }

export function getMetaData(data) {
  return request({
    url: '/dataEnd/getMetaData',
    method: 'post',
    data,
  })
}
