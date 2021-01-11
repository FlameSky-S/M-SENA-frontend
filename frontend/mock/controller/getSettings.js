const sentiment = ['Positive', 'neutral', 'Negative']

const datasets = [
  {
    name: 'CH-SIMS',
    sentiment: sentiment,
  },
  {
    name: 'CMU-MOSI',
    sentiment: sentiment,
  },
  {
    name: 'MOSEI',
    sentiment: sentiment,
  },
]

const models = ['TFN', 'LMF', 'MFN', 'MulT', 'LF_DNN', 'EF_LSTM']

module.exports = [
  {
    url: '/settings/getAllSettings',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        models: models,
        datasets: datasets,
      }
    },
  },
]
