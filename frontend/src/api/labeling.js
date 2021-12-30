import request from '@/utils/request'

// utils

export function exportLabels(data) {
  return request({
    url: '/dataEnd/exportLabels',
    method: 'post',
    data,
  })
}

export function getMyProgress(data) {
  return request({
    url: 'dataEnd/getMyProgress',
    method: 'post',
    data,
  })
}

// Admin Functions

export function getUsersForAssignment(data) {
  return request({
    url: '/dataEnd/getUsersForAssignment',
    method: 'post',
    data,
  })
}

export function assignTasks(data) {
  return request({
    url: '/dataEnd/assignTasks',
    method: 'post',
    data,
  })
}

export function getAllProgress(data) {
  return request({
    url: '/dataEnd/getAllProgress',
    method: 'post',
    data,
  })
}

export function calculateLables(data) {
  return request({
    url: '/dataEnd/calculateLables',
    method: 'post',
    data,
  })
}

export function getLabelingDetails(data) {
  return request({
    url: '/dataEnd/getLabelingDetails',
    method: 'post',
    data,
  })
}

// Text Label

export function getTextSample(data) {
  return request({
    url: 'dataEnd/getTextSample',
    method: 'post',
    data,
  })
}

export function getTextSampleNext(data) {
  return request({
    url: 'dataEnd/getTextSampleNext',
    method: 'post',
    data,
  })
}

export function submitTextLabel(data) {
  return request({
    url: '/dataEnd/submitTextLabel',
    method: 'post',
    data,
  })
}

// Audio Label

export function getAudioSample(data) {
  return request({
    url: 'dataEnd/getAudioSample',
    method: 'post',
    data,
  })
}

export function getAudioSampleNext(data) {
  return request({
    url: 'dataEnd/getAudioSampleNext',
    method: 'post',
    data,
  })
}

export function submitAudioLabel(data) {
  return request({
    url: '/dataEnd/submitAudioLabel',
    method: 'post',
    data,
  })
}

// Video Label

export function getVideoSample(data) {
  return request({
    url: '/dataEnd/getVideoSample',
    method: 'post',
    data,
  })
}

export function getVideoSampleNext(data) {
  return request({
    url: '/dataEnd/getVideoSampleNext',
    method: 'post',
    data,
  })
}

export function submitVideoLabel(data) {
  return request({
    url: '/dataEnd/submitVideoLabel',
    method: 'post',
    data,
  })
}

// Multimodal Label

export function getMultiSample(data) {
  return request({
    url: '/dataEnd/getMultiSample',
    method: 'post',
    data,
  })
}

export function getMultiSampleNext(data) {
  return request({
    url: '/dataEnd/getMultiSampleNext',
    method: 'post',
    data,
  })
}

export function submitMultiLabel(data) {
  return request({
    url: '/dataEnd/submitMultiLabel',
    method: 'post',
    data,
  })
}

export function submitQuestionableSample(data) {
  return request({
    url: '/dataEnd/submitQuestionableSample',
    method: 'post',
    data,
  })
}

export function exportUserLabels(data) {
  return request({
    url: '/dataEnd/exportUserLabels',
    method: 'post',
    data,
  })
}
