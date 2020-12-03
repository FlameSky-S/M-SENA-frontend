import request from '@/utils/request'

// get Video Info by sampleID
export function getVideoInfoByID(data) {
  return request({
    url: '/dataEnd/getVideoInfoByID',
    method: 'post',
    data,
  })
}
