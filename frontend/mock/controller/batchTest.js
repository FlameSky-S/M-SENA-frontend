const tabelHeader = [
  { label: 'Model', prop: 'model' },
  { label: 'Acc2', prop: 'acc2' },
  { label: 'Acc3', prop: 'acc3' },
  { label: 'Acc5', prop: 'acc5' },
  { label: 'F1', prop: 'f1' },
  { label: 'MAE', prop: 'mae' },
  { label: 'Corr', prop: 'corr' },
]

const testResults = [
  {
    model: 'TFN',
    acc: '80.66',
    acc3: '64.46',
    acc5: '38.38',
    f1: '81.62',
    mae: '42.52',
    corr: '61.16',
    loss: '0.001',
  },
  {
    model: 'MFN',
    acc: '77.86',
    acc3: '63.89',
    acc5: '39.39',
    f1: '78.22',
    mae: '45.19',
    corr: '55.18',
    loss: '0.001',
  },
  {
    model: 'MulT',
    acc: '77.94',
    acc3: '65.03',
    acc5: '35.34',
    f1: '79.10',
    mae: '48.45',
    corr: '55.94',
    loss: '0.001',
  },
  {
    model: 'EF-LSTM',
    acc: '69.37',
    acc3: '51.73',
    acc5: '21.02',
    f1: '81.91',
    mae: '59.34',
    corr: '-04.39',
    loss: '0.001',
  },
  {
    model: 'LF-DNN',
    acc: '79.87',
    acc3: '66.91',
    acc5: '41.62',
    f1: '80.20',
    mae: '42.01',
    corr: '61.23',
    loss: '0.001',
  },
  {
    model: 'LMF',
    acc: '79.34',
    acc3: '64.38',
    acc5: '35.14',
    f1: '79.96',
    mae: '43.99',
    corr: '60.00',
    loss: '0.001',
  },
]

module.exports = [
  {
    url: '/presentationEnd/batchResults',
    type: 'post',
    response(query) {
      return {
        code: 200,
        msg: 'success',
        // header: tabelHeader,
        result: testResults,
      }
    },
  },
]
