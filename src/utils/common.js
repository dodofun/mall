import Taro from '@tarojs/taro'
import {APP_CONSTANTS} from '../config'
import {urlReg} from '../config/regular'

/***
 * @description 获取 NODE_ENV
 */
export const getNodeEnv = () => process.env.NODE_ENV

/***
 * @description 是否开发环境
 */
export const isDev = () => getNodeEnv() === 'development'

/***
 * @description 是否启用 mock
 */
export const isOpenMock = () => isDev() && APP_CONSTANTS.OPEN_MOCK

/***
 * @description 获取当前环境
 */
export const getEnv = () => {
  return {
    env: process.env.TARO_ENV,
    envType: Taro.getEnv(),
  }
}

/***
 * @description 微信小程序环境
 */
export const isWeapp = () => {
  return Taro.getEnv() === 'WEAPP'
}

/***
 * @description Web环境
 */
export const isWeb = () => {
  return Taro.getEnv() === 'WEB'
}

/***
 * @description 获取package参数
 */
export const getPackageData = () => {
  // eslint-disable-next-line no-undef
  return _PKG_DATA
}

/***
 * 获取小程序启动时的参数
 */
export const getLaunchOptionsSync = () => {
  return Taro.getLaunchOptionsSync()
}

/***
 * @description 获取appid
 */
export const getAppid = () => {
  return APP_CONSTANTS.APP_ID[Taro.getEnv()] || ''
}

/***
 * @description 判断是否微信浏览器
 */
export function isWxBrowser() {
  if (isWeb()) {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    }
  }
  return false
}

/***
 * @description 获取浏览器地址参数
 * @param name
 * @returns {string|null}
 */
export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  } else {
    return null
  }
}

/***
 * @description 获取用户信息
 */
export const getUserInfo = () => {
  return Taro.getStorageSync('user') || {}
}

/***
 * @description 获取用户ID
 */
export const getUserId = () => {
  return getUserInfo().id
}

/***
 * @description 获取用户ID
 */
export const isUrl = (str) => {
  return urlReg.test(str)
}
