import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
import runMock from '@/mock/index'
import {getAppid, isOpenMock} from '../common'

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
    // 是否启用mock数据
    if (isOpenMock()) {
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
