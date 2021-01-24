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

/***
 * 获取店铺总收益
 * @param payload
 * @returns {Promise<void>}
 */
export const getTotalIncome = async (shopId) => {
  const result = await http.get(api.TOTAL_INCOME.replace('{shopId}', shopId))
  return checkAndGetResult(result)
}

/***
 * 获取成功活动列表
 * @param payload
 * @returns {Promise<void>}
 */
export const getSuccessGoodsList = async (shopId, index = 0, size = 40) => {
  const result = await http.get(
    api.SUCCESS_GOODS_LIST.replace('{shopId}', shopId)
      .replace('{index}', index)
      .replace('{size}', size),
  )
  return checkAndGetResult(result)
}
