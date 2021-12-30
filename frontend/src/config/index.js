const config = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://166.111.138.142:8000'
      : window.baseURL,
  contentType: 'application/json;charset=UTF-8',
  successCode: [200, 0],
  requestTimeout: 300000,
}
module.exports = config
