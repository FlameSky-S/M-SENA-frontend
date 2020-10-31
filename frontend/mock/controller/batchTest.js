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

const sentiment = [
  {
    value: '0',
    label: 'All',
  },
  {
    value: '1',
    label: 'Positive',
  },
  {
    value: '2',
    label: 'Neutural',
  },
  {
    value: '3',
    label: 'Negative',
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
    acc2: '80.66 ± 1.4',
    acc3: '64.46 ± 1.7',
    acc5: '38.38 ± 3.6',
    f1: '81.62 ± 1.1',
    mae: '42.52 ± 1.1',
    corr: '61.16 ± 1.2',
  },
  {
    model: 'MFN',
    acc2: '77.86 ± 0.4',
    acc3: '63.89 ± 1.9',
    acc5: '39.39 ± 1.8',
    f1: '78.22 ± 0.4',
    mae: '45.19 ± 1.2',
    corr: '55.18 ± 2.0',
  },
  {
    model: 'MulT',
    acc2: '77.94 ± 0.9',
    acc3: '65.03 ± 2.1',
    acc5: '35.34 ± 2.9',
    f1: '79.10 ± 0.9',
    mae: '48.45 ± 2.6',
    corr: '55.94 ± 0.6',
  },
  {
    model: 'EF-LSTM',
    acc2: '69.37 ± 0.0',
    acc3: '51.73 ± 2.0',
    acc5: '21.02 ± 0.2',
    f1: '81.91 ± 0.0',
    mae: '59.34 ± 0.3',
    corr: '-04.39 ± 2.8',
  },
  {
    model: 'LF-DNN',
    acc2: '79.87 ± 0.6',
    acc3: '66.91 ± 1.2',
    acc5: '41.62 ± 1.4',
    f1: '80.20 ± 0.6',
    mae: '42.01 ± 0.9',
    corr: '61.23 ± 1.8',
  },
  {
    model: 'LMF',
    acc2: '79.34 ± 0.4',
    acc3: '64.38 ± 2.1',
    acc5: '35.14 ± 4.6',
    f1: '79.96 ± 0.6',
    mae: '43.99 ± 1.6',
    corr: '60.00 ± 1.3',
  },
]

module.exports = [
  {
    url: '/presentationEnd/getSettings',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        datasets: datasets,
        // sets: sets,
        sentiment: sentiment,
        models: models,
      }
    },
  },
  {
    url: '/presentationEnd/getResults',
    type: 'post',
    response(query) {
      return {
        code: 200,
        msg: 'success',
        header: tabelHeader,
        result: testResults,
      }
    },
  },
]
