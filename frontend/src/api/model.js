import request from '@/utils/request'

export function getModelList(data) {
  return request({
    url: '/model/modelList',
    method: 'post',
    data,
  })
}

export function trainSettings() {
  return request({
    url: '/model/trainSettings',
    method: 'get',
  })
}

export function startTraining(data) {
  return request({
    url: '/model/startTraining',
    method: 'post',
    data,
  })
}

export function getTrainResults(data) {
  return request({
    url: '/model/trainResults',
    method: 'post',
    data,
  })
}

export function delModel(data) {
  return request({
    url: '/model/delModel',
    method: 'post',
    data,
  })
}
