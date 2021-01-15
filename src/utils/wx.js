import {getWxToken, networkAgent} from '../api'
import {getAppid, isWeapp} from '@/utils/common'

/***
 * 主动推送页面信息，加快微信收录
 * @returns {Promise<void>}
 */
export const submitPages = async (configPages = []) => {
  if (!isWeapp()) {
    return
  }

  // 组装 pages 数据
  const pages = configPages.map((item) => {
    // TODO query参数待完善
    return {path: item, query: 't=1'}
  })
  const tokenRes = await getWxToken({ownerId: 1, appid: getAppid()})
  networkAgent({
    url: 'https://api.weixin.qq.com/wxa/search/wxaapi_submitpages',
    enableCache: false,
    querys: JSON.stringify({access_token: tokenRes.data}),
    body: JSON.stringify({
      pages,
    }),
    cacheTime: 60000,
    method: 'post',
  }).then((res) => {
    console.log('res', res)
  })
}
