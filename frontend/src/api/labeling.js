import request from '@/utils/request'

export function startActiveLearning(data) {
  return request({
    url: '/dataEnd/startActiveLearning',
    method: 'post',
    data,
  })
}

export function exportLabels(data) {
  return request({
    url: '/dataEnd/exportLabels',
    method: 'post',
    data,
  })
}

export function getALModels() {
  return request({
    url: '/dataEnd/getALModels',
    method: 'get',
  })
}

export function getClassifierConfig(data) {
  return request({
    url: '/dataEnd/getClassifierConfig',
    method: 'post',
    data,
  })
}

export function getSelectorConfig(data) {
  return request({
    url: '/dataEnd/getSelectorConfig',
    method: 'post',
    data,
  })
}

export function saveClassifierConfig(data) {
  return request({
    url: '/dataEnd/saveClassifierConfig',
    method: 'post',
    data,
  })
}

export function saveSelectorConfig(data) {
  return request({
    url: '/dataEnd/saveSelectorConfig',
    method: 'post',
    data,
  })
}

// get next sampleId to label.
export function getHardSamples(data) {
  return request({
    url: '/dataEnd/getHardSamples',
    method: 'post',
    data,
  })
}

// submit manual labeling results.
export function submitLabelResult(data) {
  return request({
    url: '/dataEnd/submitLabelResult',
    method: 'post',
    data,
  })
}
