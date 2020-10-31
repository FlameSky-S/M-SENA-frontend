const datasetDetails = [
  {
    videoID: '03bSnISJMiM',
    clipID: '03bSnISJMiM_11',
    preface:
      'https://picsum.photos/200/200?random=C5cBcd62-dDd4-CF80-d5fB-2ff9CacC6f89',
    multimodalLabel: -0.5,
    belonging: 'Train',
  },
  {
    videoID: '03bSnISJMiM',
    clipID: '03bSnISJMiM_10',
    preface:
      'https://picsum.photos/200/200?random=bDfa4f7D-DE28-86Ec-bD5a-62CEBF3Db1f7',
    multimodalLabel: -1.2,
    belonging: 'Train',
  },
  {
    videoID: '03bSnISJMiM',
    clipID: '03bSnISJMiM_13',
    preface:
      'https://picsum.photos/200/200?random=8e51a41d-D515-9019-7f6B-ffcfd4BbDbCb',
    multimodalLabel: 1.8,
    belonging: 'Train',
  },
  {
    videoID: 'W8NXH0Djyww',
    clipID: 'W8NXH0Djyww_31',
    preface:
      'https://picsum.photos/200/200?random=0f8c9AE6-41Cb-9598-88Dd-c72CBf0a9Fb3',
    multimodalLabel: 0.6,
    belonging: 'Train',
  },
  {
    videoID: 'W8NXH0Djyww',
    clipID: 'W8NXH0Djyww_30',
    preface:
      'https://picsum.photos/200/200?random=ecBD33F2-dfc3-Af91-557f-fbe4aF1845b4',
    multimodalLabel: -0.4,
    belonging: 'Train',
  },
  {
    videoID: 'W8NXH0Djyww',
    clipID: 'W8NXH0Djyww_32',
    preface:
      'https://picsum.photos/200/200?random=2cffc176-B5Bd-FD7F-fC09-35F66bE754dA',
    multimodalLabel: 2.0,
    belonging: 'Train',
  },
  {
    videoID: 'WKA5OygbEKI',
    clipID: 'WKA5OygbEKI_20',
    preface:
      'https://picsum.photos/200/200?random=E9e2fc89-5fe2-32eA-3DEF-B623cfdfEE85',
    multimodalLabel: 0.0,
    belonging: 'Valid',
  },
  {
    videoID: 'WKA5OygbEKI',
    clipID: 'WKA5OygbEKI_21',
    preface:
      'https://picsum.photos/200/200?random=90565d79-CEb5-2bcE-76bC-A524bEB521BD',
    multimodalLabel: 1.6,
    belonging: 'Valid',
  },
  {
    videoID: 'WKA5OygbEKI',
    clipID: 'WKA5OygbEKI_22',
    preface:
      'https://picsum.photos/200/200?random=6eA6b991-7f0E-9621-CD7E-1594bEF4Ed4d',
    multimodalLabel: 0.4,
    belonging: 'Valid',
  },
  {
    videoID: 'WKA5OygbEKI',
    clipID: 'WKA5OygbEKI_1',
    preface:
      'https://picsum.photos/200/200?random=6eA6b991-7f0E-9621-CD7E-1594bEF4Ed4d',
    multimodalLabel: 1.8,
    belonging: 'Valid',
  },
  {
    videoID: 'WKA5OygbEKI',
    clipID: 'WKA5OygbEKI_2',
    preface:
      'https://picsum.photos/200/200?random=6eA6b991-7f0E-9621-CD7E-1594bEF4Ed4d',
    multimodalLabel: 1.2,
    belonging: 'Valid',
  },
  {
    videoID: 'WKA5OygbEKI',
    clipID: 'WKA5OygbEKI_3',
    preface:
      'https://picsum.photos/200/200?random=6eA6b991-7f0E-9621-CD7E-1594bEF4Ed4d',
    multimodalLabel: 2.2,
    belonging: 'Valid',
  },
  {
    videoID: 'WKA5OygbEKI',
    clipID: 'WKA5OygbEKI_4',
    preface:
      'https://picsum.photos/200/200?random=6eA6b991-7f0E-9621-CD7E-1594bEF4Ed4d',
    multimodalLabel: 0.6,
    belonging: 'Valid',
  },
  {
    videoID: 'c7UH_rxdZv4',
    clipID: 'c7UH_rxdZv4_24',
    preface:
      'https://picsum.photos/200/200?random=6eA6b991-7f0E-9621-CD7E-1594bEF4Ed4d',
    multimodalLabel: -1.8,
    belonging: 'Test',
  },
  {
    videoID: 'c7UH_rxdZv4',
    clipID: 'c7UH_rxdZv4_25',
    preface:
      'https://picsum.photos/200/200?random=6eA6b991-7f0E-9621-CD7E-1594bEF4Ed4d',
    multimodalLabel: 0.0,
    belonging: 'Test',
  },
  {
    videoID: 'c7UH_rxdZv4',
    clipID: 'c7UH_rxdZv4_26',
    preface:
      'https://picsum.photos/200/200?random=6eA6b991-7f0E-9621-CD7E-1594bEF4Ed4d',
    multimodalLabel: -2.6,
    belonging: 'Test',
  },
]

module.exports = [
  {
    url: '/dataEnd/getDetails',
    type: 'post',
    response(config) {
      const { datasetName, pageNo, pageSize, title } = config.body

      let mockDatasetDetails = datasetDetails.filter((item) => {
        return !(title && item.title.indexOf(title) < 0)
      })
      const detailList = mockDatasetDetails.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        totalCount: datasetDetails.length,
        data: detailList,
      }
    },
  },
]
