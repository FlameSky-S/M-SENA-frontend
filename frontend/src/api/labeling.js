import request from '@/utils/request'

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
