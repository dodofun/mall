/***
 * ACTIONS
 */
import Taro from '@tarojs/taro'
import http from '../utils/servers'
import {commonHttpRequest} from '@/utils/servers/utils'
import * as api from '../config/api'
import {APP_CONSTANTS} from '../config/index'
import {getAppid} from '@/utils/common'
import {checkAndGetResult} from '../utils/servers/utils'

/***
 * @description 根据 code 获取用户信息
 * @param payload
 * @returns {Promise<void>}
 */
export const code2Session = async (payload) => {
  const env = Taro.getEnv()
  let res
  switch (env) {
    case Taro.ENV_TYPE.WEAPP:
      res = await code2SessionWx(payload)
      break
  }
  return res
}

/***
 * @description 根据 code 获取用户信息: 微信小程序
 * @param payload
 * @returns {Promise<void>}
 */
export const code2SessionWx = async (payload) => {
  const result = await http.post(api.WX_CODE_TO_SESSION, {
    ownerId: APP_CONSTANTS.APP_OWNERID,
    appid: payload.appid,
    code: payload.code,
  })
  return checkAndGetResult(result)
}

/***
 * @description 登录
 */
export const login = async () => {
  const loginRes = await Taro.login()
  if (loginRes && loginRes.code) {
    const code = loginRes.code
    const userInfo = await code2Session({
      appid: getAppid(),
      code: code,
    })
    Taro.setStorageSync('userInfo', userInfo || {})
  }
}

/***
 * @description 授权获取 用户信息/用户手机号
 * @param e event
 * @param type 授权类型 userinfo  mobile
 */
export const authUserInfoWx = async (e, type) => {
  if (e.detail.iv) {
    const loginRes = await Taro.login()
    // 允许授权
    const userInfo = await getUserInfoWx({
      ownerId: 1,
      appid: getAppid(),
      type,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      code: loginRes.code,
    })

    return userInfo
  }
}

/***
 * 授权获取微信用户相关信息
 * @param payload
 * @returns {Promise<void>}
 */
export const getUserInfoWx = async (payload) => {
  const result = await http.post(api.WX_GET_USERINFO, payload)
  return checkAndGetResult(result)
}

export const demo = () => {
  return commonHttpRequest(
    'app',
    'get',
    {ownerId: 1, id: 2},
    {page: 1, size: 10},
  )
}
