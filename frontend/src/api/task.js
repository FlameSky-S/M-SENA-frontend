import request from '@/utils/request'

export function getTaskList() {
  return request({
    url: '/task/getTaskList',
    method: 'get',
  })
}

export function delTask(data) {
  return request({
    url: '/task/delTask',
    method: 'post',
    data,
  })
}

export function stopTask(data) {
  return request({
    url: '/task/stopTask',
    method: 'post',
    data,
  })
}

export function delAllTask() {
  return request({
    url: '/task/delAllTask',
    method: 'get',
  })
}
