import request from '@/utils/request'

export function getModelList(data) {
  console.log(data)
  return request({
    url: '/modelEnd/modelList',
    method: 'POST',
    data,
  })
}

export function delModel(data) {
  return request({
    url: '/modelEnd/delModel',
    method: 'post',
    data,
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

export function setDefaultParams(data) {
  return request({
    url: '/modelEnd/setDefaultParams',
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
