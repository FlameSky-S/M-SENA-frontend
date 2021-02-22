const config = {
  baseURL:
    // 'http://166.111.138.96:5000',
    process.env.NODE_ENV === 'development'
      ? 'http://166.111.138.98:5000'
      : window.baseURL,
  contentType: 'application/json;charset=UTF-8',
  successCode: [200, 0],
  requestTimeout: 60000,
}
module.exports = config
