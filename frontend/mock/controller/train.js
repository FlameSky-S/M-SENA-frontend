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

module.exports = [
  {
    url: '/model/trainSettings',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        datasets: datasets,
        models: models,
      }
    },
  },
  {
    url: '/model/startTraining',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
        result: true,
      }
    },
  },
]
