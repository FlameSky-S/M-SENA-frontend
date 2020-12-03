progress_bar = 0

module.exports = [
  {
    url: '/dataEnd/startActiveLearning',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
