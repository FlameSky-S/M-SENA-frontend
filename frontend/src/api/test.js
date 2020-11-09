import request from '@/utils/request'

export function doTest() {
  return request({
    url: '/test',
    method: 'get',
    withCredentials: true,
  })
}
