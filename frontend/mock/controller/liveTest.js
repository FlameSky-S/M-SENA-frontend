const testResults = [
  {
    model: 'TFN',
    predict: 'Positive',
    positive: '0.94',
    neutral: '0.05',
    negative: '0.01',
  },
  {
    model: 'MFN',
    predict: 'Positive',
    positive: '0.90',
    neutral: '0.07',
    negative: '0.03',
  },
  {
    model: 'LMF',
    predict: 'Positive',
    positive: '0.92',
    neutral: '0.06',
    negative: '0.02',
  },
  {
    model: 'LF_DNN',
    predict: 'Positive',
    positive: '0.89',
    neutral: '0.05',
    negative: '0.06',
  },
  {
    model: 'EF_LSTM',
    predict: 'Positive',
    positive: '0.94',
    neutral: '0.04',
    negative: '0.02',
  },
]

const transcript = 'This is the transcript of the recorded video.'

module.exports = [
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
