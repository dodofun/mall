import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
import {APP_CONSTANTS} from '@/config/index'
import runMock from '@/mock/index'
import {getAppid} from '../common'

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem))

class httpRequest {
  baseOptions(params, method = 'GET') {
    const {url, data, header} = params
    const defaultHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    const BASE_URL = getBaseUrl(url)
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        ...defaultHeader,
        ...header,
        token: Taro.getStorageSync('token'),
        appid: getAppid(),
      },
    }
    if (APP_CONSTANTS.OPEN_MOCK) {
      return runMock({method, url})
    }
    return Taro.request(option)
  }

  get(url, data = {}, header = {}) {
    const option = {url, data, header}
    return this.baseOptions(option)
  }

  post(url, data = {}, header = {}) {
    const option = {url, data, header}
    return this.baseOptions(option, 'POST')
  }

  put(url, data = {}, header = {}) {
    const option = {url, data, header}
    return this.baseOptions(option, 'PUT')
  }

  delete(url, data = {}, header = {}) {
    const option = {url, data, header}
    return this.baseOptions(option, 'DELETE')
  }
}

export default new httpRequest()
