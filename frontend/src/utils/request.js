import axios from 'axios'
import qs from 'qs'

import { Message } from 'element-ui'
import { baseURL, contentType, requestTimeout, successCode } from '@/config'
import { isArray } from '@/utils/validate'

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

const errMessage = (message) => {
  Message({
    offset: 60,
    showClose: true,
    message: message,
    type: 'error',
    dangerouslyUseHTMLString: true,
    duration: 3000,
  })
}

const handleCode = (code, msg) => {
  errMessage(msg || `Server Error ${code}`)
}

instance.interceptors.request.use(
  (config) => {
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const { data, config } = response
    const { code, msg } = data
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    if (codeVerificationArray.includes(code)) {
      return data
    } else {
      handleCode(code, msg)
      return Promise.reject(
        'Request Failed:' + JSON.stringify({ url: config.url, code, msg }) ||
          'Error'
      )
    }
  },
  (error) => {
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.msg || message)
      return Promise.reject(error)
    } else {
      let { message } = error
      errMessage(message)
      return Promise.reject(error)
    }
  }
)

export default instance
