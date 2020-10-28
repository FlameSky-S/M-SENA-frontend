const count = 12

const List = [
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
  {
    datasetName: 'MOSI',
    capacity: 2199,
    language: 'English',
    unimodalLabel: 'NO',
    labelType: 'Classification',
    description:
      '2199 opinion video clips each annotated with sentiment in the range [-3,3]',
  },
]
module.exports = [
  {
    url: '/dataEnd/getDatasetList',
    type: 'post',
    response(config) {
      const { title = '', pageNo = 1, pageSize = 20 } = config.body
      let mockDatasetList = List.filter((item) => {
        return !(title && item.title.indexOf(title) < 0)
      })
      const datasetList = mockDatasetList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        totalCount: count,
        data: datasetList,
      }
    },
  },
]
