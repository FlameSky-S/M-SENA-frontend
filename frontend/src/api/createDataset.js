import request from '@/utils/request'

export function createDataset(data) {
  return request({
    url: '/data/create_dataset',
    method: 'post',
    data,
  })
}
