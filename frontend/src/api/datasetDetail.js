import request from '@/utils/request'

export function getDetails(data) {
  return request({
    url: '/dataEnd/getDetails',
    method: 'post',
    data,
  })
}
