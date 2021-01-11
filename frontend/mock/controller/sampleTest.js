const testResults = []

const result = {
  v_id: '0001',
  c_id: '0003',
  label: 'Positive',
  prediction: {
    predict: 'Positive',
    negative: '2.0%',
    neutral: '9.1%',
    positive: '88.9%',
  },
  v_url: 'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
}

module.exports = [
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
