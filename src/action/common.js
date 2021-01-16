/***
 * ACTIONS
 */
import http from '../utils/servers'
import * as api from '../config/api'
import {getAppid} from '@/utils/common'
import {checkAndGetResult} from '@/utils/servers/utils'

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
  return checkAndGetResult(result)
}

/***
 * @description 根据appid获取app相关信息
 * @returns {Promise<void>}
 */
export const queryAppinfo = async () => {
  const result = await http.get(
    api.QUERY_APPINFO_BY_APPID.replace('{appid}', getAppid()),
  )
  return checkAndGetResult(result)
}

/***
 * 阿里云直传签名
 * @param payload
 * @returns {Promise<void>}
 */
export const getOssSignature = async (payload = {}) => {
  const result = await http.get(
    api.ALIYUN_OSS_SIGNATURE + `?bucket=${payload.bucket}`,
  )
  return checkAndGetResult(result)
}
