const resultList = []

resultset1 = {
  id: '00001',
  model: 'TFN',
  dataset: 'CH-SIMS',
  mode: 'tune',
  date: '2020-09-30 14:32:27',
  accuracy: '80.66',
  f1: '81.62',
  mae: '42.52',
  corr: '61.16',
  loss: '0.00215',
  description: 'Notes TFN CH-SIMS',
  args: '{"x1": "1", "x2": "2", "x3": "3"}',
}

resultset2 = {
  id: '00002',
  model: 'MFN',
  dataset: 'MOSEI',
  mode: 'tune',
  date: '2020-09-30 14:32:27',
  accuracy: '60',
  f1: '81.62',
  mae: '42.52',
  corr: '61.16',
  loss: '0.03215',
  description: 'Notes MFN MOSEI',
  args: '{"x1": "1", "x2": "2", "x3": "3"}',
}

for (let i = 1; i < 20; ++i) {
  resultList.push(resultset1)
}
for (let i = 1; i < 20; ++i) {
  resultList.push(resultset2)
}

module.exports = [
  {
    url: '/modelEnd/getResults',
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
  {
    url: '/modelEnd/setDefaultParams',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
  {
    url: '/modelEnd/delResult',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
