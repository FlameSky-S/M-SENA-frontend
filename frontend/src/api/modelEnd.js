import request from '@/utils/request'

export function getCitations() {
  return request({
    url: '/modelEnd/getCitations',
    method: 'get',
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
