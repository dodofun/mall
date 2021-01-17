/***
 * ACTIONS
 */
import http from '../utils/servers'
import * as api from '../config/api'
import {checkAndGetResult} from '../utils/servers/utils'
import {getAppid, getAppOwnerId} from '@/utils/common'

/***
 * 发起订单支付
 * @param payload
 * @returns {Promise<void>}
 */
export const toPayOrder = async ({orderId, userId}) => {
  const result = await http.post(api.TO_PAY_ORDER, {
    orderId,
    userId,
    appid: getAppid(),
    appOwnerId: getAppOwnerId(),
  })
  return checkAndGetResult(result)
}
