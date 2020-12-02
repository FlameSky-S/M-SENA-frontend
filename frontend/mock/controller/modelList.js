const modelList = [
  {
    id: '001',
    modelName: 'TFN',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    id: '002',
    modelName: 'TFN',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    id: '003',
    modelName: 'TFN',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    id: '004',
    modelName: 'TFN',
    description: 'This is the description for Tensor Fusion Network',
  },

  {
    id: '005',
    modelName: 'TFN',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    id: '006',
    modelName: 'TFN',
    description: 'This is the description for Tensor Fusion Network',
  },
  {
    id: '007',
    modelName: 'TFN',
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
]
