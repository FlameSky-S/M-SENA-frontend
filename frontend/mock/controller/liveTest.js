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

const testResults = [
  {
    model: 'TFN',
    predict: 'Positive',
    positive: '0.94',
    neutural: '0.05',
    negative: '0.01',
  },
  {
    model: 'MFN',
    predict: 'Positive',
    positive: '0.90',
    neutural: '0.07',
    negative: '0.03',
  },
  {
    model: 'LMF',
    predict: 'Positive',
    positive: '0.92',
    neutural: '0.06',
    negative: '0.02',
  },
  {
    model: 'LF_DNN',
    predict: 'Positive',
    positive: '0.89',
    neutural: '0.05',
    negative: '0.06',
  },
  {
    model: 'EF_LSTM',
    predict: 'Positive',
    positive: '0.94',
    neutural: '0.04',
    negative: '0.02',
  },
]

const transcript = 'This is the transcript of the recorded video.'

module.exports = [
  {
    url: '/presentationEnd/liveSettings',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        models: models,
      }
    },
  },
  {
    url: '/presentationEnd/liveResults',
    type: 'post',
    response(query) {
      return {
        code: 200,
        msg: 'success',
        result: testResults,
      }
    },
  },
  {
    url: '/presentationEnd/liveTranscript',
    type: 'post',
    response(query) {
      return {
        code: 200,
        msg: 'success',
        transcript: transcript,
      }
    },
  },
]
