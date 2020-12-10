import request from '@/utils/request'
import { method } from 'lodash'

// Functions used in datasetDetails Page.
export function startActiveLearning(data) {
  return request({
    url: '/dataEnd/startActiveLearning',
    method: 'post',
    data,
  })
}

// get video dialouge Info by sampleId
export function getVideoLabelInfoById(data) {
  return request({
    url: '/dataEnd/getVideoLabelInfoById',
    method: 'post',
    data,
  })
}

// get classifier & selector list together.
export function getALModels() {
  return request({
    url: '/dataEnd/getALModels',
    method: 'get',
  })
}

// get all Classifier Config.
export function getClassifierConfig(data) {
  return request({
    url: '/dataEnd/getClassifierConfig',
    method: 'post',
    data,
  })
}

// get all Selector Config.
export function getSelectorConfig(data) {
  return request({
    url: '/dataEnd/getSelectorConfig',
    method: 'post',
    data,
  })
}

export function modifyClassifierConfig(data) {
  return request({
    url: '/dataEnd/modifyClassifierConfig',
    method: 'post',
    data,
  })
}

export function modifySelectorConfig(data) {
  return request({
    url: '/dataEnd/modifySelectorConfig',
    method: 'post',
    data,
  })
}

// get next sampleId to label.
export function getNextSampleId(data) {
  return request({
    url: '/dataEnd/getNextSampleId',
    method: 'post',
    data,
  })
}

// submit manually labeling results.
export function submitLabelResult(data) {
  return request({
    url: '/dataEnd/submitLabelResult',
    method: 'post',
    data,
  })
}
