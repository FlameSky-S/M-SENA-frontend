const Args = [{ LR: 0.001, Apple: 'apple', Boy: 'boy' }]

module.exports = [
  {
    url: '/modelEnd/getArgs',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
        args: Args,
      }
    },
  },
  {
    url: '/modelEnd/startTraining',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
