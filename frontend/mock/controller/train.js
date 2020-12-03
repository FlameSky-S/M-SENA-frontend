module.exports = [
  {
    url: '/modelEnd/startTraining',
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
