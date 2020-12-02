import request from '@/utils/request'

export function getModelList(data) {
  return request({
    url: '/model/modelList',
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

export function addModel() {
  return request({
    url: '/model/addModel',
    method: 'get',
  })
}

export function getTrainResults(data) {
  return request({
    url: '/model/trainResults',
    method: 'post',
    data,
  })
}

export function startTraining(data) {
  return request({
    url: '/model/startTraining',
    method: 'post',
    data,
  })
}
