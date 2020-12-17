import request from '@/utils/request'

export function getModelList() {
  return request({
    url: '/modelEnd/modelList',
    method: 'get',
  })
}

export function scanModel() {
  return request({
    url: '/modelEnd/scanModel',
    method: 'get',
  })
}

export function getResults(data) {
  return request({
    url: '/modelEnd/getResults',
    method: 'post',
    data,
  })
}

export function setDefaultModel(data) {
  return request({
    url: '/modelEnd/setDefaultModel',
    method: 'post',
    data,
  })
}

export function delResult(data) {
  return request({
    url: '/modelEnd/delResult',
    method: 'post',
    data,
  })
}

export function getArgs(data) {
  return request({
    url: '/modelEnd/getArgs',
    method: 'post',
    data,
  })
}

export function startTraining(data) {
  return request({
    url: '/modelEnd/startTraining',
    method: 'post',
    data,
  })
}
