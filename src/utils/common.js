/***
 * 获取当前环境
 * 取值范围：weapp / swan / alipay / h5 / rn / tt / qq / quickapp
 */
export const getEnv = () => {
  return process.env.TARO_ENV
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
