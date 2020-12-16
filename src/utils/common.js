import Taro from '@tarojs/taro'

/***
 * 获取当前环境
 */
export const getEnv = () => {
  return {
    env: process.env.TARO_ENV,
    envType: Taro.getEnv(),
  }
}

/***
 * 微信小程序环境
 */
export const isWeapp = () => {
  return Taro.getEnv() === 'WEAPP'
}

/***
 * Web环境
 */
export const isWeb = () => {
  return Taro.getEnv() === 'WEB'
}

/***
 * 获取配置参数
 */
export const getConfigData = (name) => {
  // eslint-disable-next-line no-undef
  return _APP_CONSTANTS[name]
}

/***
 * 获取package参数
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
