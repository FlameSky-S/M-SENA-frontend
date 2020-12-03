const modelList = [
  {
    model_name: 'TFN',
    paper_name: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paper_url: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    model_name: 'TFN',
    paper_name: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paper_url: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    model_name: 'TFN',
    paper_name: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paper_url: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    model_name: 'TFN',
    paper_name: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paper_url: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },

  {
    model_name: 'TFN',
    paper_name: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paper_url: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    model_name: 'TFN',
    paper_name: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paper_url: 'https://arxiv.org/abs/1707.07250',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    model_name: 'TFN',
    paper_name: 'Tensor Fusion Network for Multimodal Sentiment Analysis',
    paper_url: 'https://arxiv.org/abs/1707.07250',
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
