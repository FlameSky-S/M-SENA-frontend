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
    url: '/model/modelList',
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
    url: '/model/delModel',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
  {
    url: '/model/addModel',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
