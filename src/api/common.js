/***
 * ACTIONS
 */
import http from '../utils/servers'
import * as api from '../config/api'

/***
 * @description 代理网络请求
 * @param payload
 * @returns {Promise<void>}
 */
export const networkAgent = async (payload) => {
  const result = await http.post(api.NETWORK_AGENT, payload)
  return result
}

/***
 * @description 获取 accesstoken
 * @param payload
 * @returns {Promise<void>}
 */
export const getWxToken = async (payload) => {
  const result = await http.post(api.QUERY_WX_TOKEN, {
    ownerId: payload.ownerId,
    appid: payload.appid,
  })
  if (result && result.data && result.data.head.code === 1) {
    return result.data.body.data
  }
}

/***
 * @description 根据appid获取小程序相关信息
 * @param payload
 * @returns {Promise<void>}
 */
export const queryAppinfoByAppid = async (payload) => {
  const result = await http.get(
    api.QUERY_APPINFO_BY_APPID.replace('{appid}', payload.appid),
  )
  if (result && result.data && result.data.head.code === 1) {
    return result.data.body.data
  }
}
