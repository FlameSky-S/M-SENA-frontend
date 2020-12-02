const resultList = []

resultset = {
  id: '00001',
  model: 'TFN',
  dataset: 'CH-SIMS',
  mode: 'tune',
  date: '2020-09-30 14:32:27',
  description:
    'This is the description of the train result with TFN on CH-SIMS',
}

for (let i = 1; i < 100; ++i) {
  resultList.push(resultset)
}

module.exports = [
  {
    url: '/model/trainResults',
    type: 'post',
    response(config) {
      let { model, dataset, mode, pageNo, pageSize } = config.body
      let mockResultList = resultList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      let total = resultList.length
      return {
        code: 200,
        msg: 'success',
        results: mockResultList,
        totalCount: total,
      }
    },
  },
]
