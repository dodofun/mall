import Taro from '@tarojs/taro'
import {HTTP_STATUS} from './config'
import {APP_CONSTANTS} from '../../config/index'
import {isDev} from '../common'

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then((res) => {
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject('请求资源不存在')
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject('服务端出现了问题')
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      return Promise.reject('没有权限访问')
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      return Promise.reject('需要鉴权')
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data
    }
  })
}

const interceptors = [Taro.interceptors.timeoutInterceptor]

if (isDev()) {
  interceptors.push(Taro.interceptors.logInterceptor)
}

// eslint-disable-next-line no-undef
if (APP_CONSTANTS.OPEN_CUSTOM_INTERCEPTOR) {
  interceptors.unshift(customInterceptor)
}

export default interceptors
