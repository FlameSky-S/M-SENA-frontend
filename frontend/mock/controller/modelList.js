const modelList = [
  {
    modelName: 'TFN',
    paperTitle: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paperLink: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    modelName: 'TFN',
    paperTitle: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paperLink: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    modelName: 'TFN',
    paperTitle: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paperLink: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    modelName: 'TFN',
    paperTitle: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paperLink: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },

  {
    modelName: 'TFN',
    paperTitle: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paperLink: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    modelName: 'TFN',
    paperTitle: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paperLink: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    modelName: 'TFN',
    paperTitle: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paperLink: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
]

module.exports = [
  {
    url: '/modelEnd/modelList',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
        modelList: modelList,
        totalCount: 7,
      }
    },
  },
  {
    url: '/modelEnd/delModel',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
  {
    url: '/modelEnd/scanModel',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
