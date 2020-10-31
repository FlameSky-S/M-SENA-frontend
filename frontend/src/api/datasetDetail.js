import request from '@/utils/request'

export function getDetails(config) {
  return request({
    url: '/dataEnd/getDetails',
    method: 'post',
    config,
  })
}
