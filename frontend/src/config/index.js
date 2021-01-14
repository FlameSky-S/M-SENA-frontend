const config = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://166.111.138.149:5000'
      : 'http://166.111.138.149:5000',
  contentType: 'application/json;charset=UTF-8',
  successCode: [200, 0],
  requestTimeout: 60000,
}
module.exports = config
