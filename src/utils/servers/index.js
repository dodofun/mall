import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
import {APP_CONSTANTS} from '@/config/index'
import runMock from '@/mock/index'

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem))

class httpRequest {
  baseOptions(params, method = 'GET') {
    const {url, data} = params
    const BASE_URL = getBaseUrl(url)
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        token: Taro.getStorageSync('token'),
      },
    }
    if (APP_CONSTANTS.OPEN_MOCK) {
      return runMock({method, url})
    }
    return Taro.request(option)
  }

  get(url, data = '') {
    const option = {url, data}
    return this.baseOptions(option)
  }

  post(url, data, contentType) {
    const params = {url, data, contentType}
    return this.baseOptions(params, 'POST')
  }

  put(url, data = '') {
    const option = {url, data}
    return this.baseOptions(option, 'PUT')
  }

  delete(url, data = '') {
    const option = {url, data}
    return this.baseOptions(option, 'DELETE')
  }
}

export default new httpRequest()
