const datasets = [
  {
    value: '01',
    label: 'CH-SIMS',
  },
  {
    value: '02',
    label: 'CMU-MOSI',
  },
  {
    value: '03',
    label: 'MOSEI',
  },
]

const sentiment = [
  {
    value: '0',
    label: 'All',
  },
  {
    value: '1',
    label: 'Positive',
  },
  {
    value: '2',
    label: 'Neutural',
  },
  {
    value: '3',
    label: 'Negative',
  },
]

const models = [
  {
    value: '001',
    label: 'TFN',
  },
  {
    value: '002',
    label: 'LMF',
  },
  {
    value: '003',
    label: 'MFN',
  },
  {
    value: '004',
    label: 'MulT',
  },
  {
    value: '005',
    label: 'LF_DNN',
  },
  {
    value: '006',
    label: 'EF_LSTM',
  },
]

const testResults = []

const result = {
  v_id: '0001',
  c_id: '0003',
  label: 'Positive',
  prediction: {
    negative: '2.0%',
    neutural: '9.1%',
    positive: '88.9%',
  },
  videoCfg: {
    id: '0001',
    url: 'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
    volume: 1,
    autoplay: false,
  },
}

module.exports = [
  {
    url: '/presentationEnd/sampleSettings',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        datasets: datasets,
        sentiment: sentiment,
        models: models,
      }
    },
  },
  {
    url: '/presentationEnd/sampleResults',
    type: 'post',
    response(query) {
      testResults.length = 0
      for (let i = 1; i <= 6; i++) {
        testResults.push(result)
      }
      return {
        code: 200,
        msg: 'success',
        result: testResults,
      }
    },
  },
]
