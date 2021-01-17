import Taro from '@tarojs/taro'
import httpRequest from '@/utils/servers'

/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route
  return url
}

/***
 * @description 通用模块请求
 * @param model: 模块
 * @param type: 请求类型  get: 获取数据，add: 新增数据，upadte: 更新数据，delete: 删除数据, getList: 获取数据列表
 * @param pathParams: 路径参数
 * @param query: query参数
 * @param data: body参数
 * @param header: header参数
 * @return data: 数据
 */
export const commonHttpRequest = (
  model,
  type = 'get',
  pathParams,
  query = {},
  data = {},
  header = {},
  version = 'v1',
) => {
  if (!model || !pathParams) {
    return
  }
  let url = `/${version}/owner/${pathParams.ownerId}/${model}/${pathParams.id}`
  if (type === 'getList') {
    url = `/v1/owner/${pathParams.ownerId}/${model}s`
  }
  const queryKeys = Object.keys(query)
  if (queryKeys.length > 0) {
    let queryUrl = ''
    queryKeys.forEach((key) => (queryUrl += key + '=' + query[key] + '&'))
    url += '?' + queryUrl.substring(0, queryUrl.length - 1)
  }
  let res
  switch (type) {
    case 'get':
      res = httpRequest.get(url, data, header)
      break
    case 'getList':
      res = httpRequest.get(url, data, header)
      break
    case 'add':
      res = httpRequest.post(url, data, header)
      break
    case 'update':
      res = httpRequest.put(url, data, header)
      break
    default:
      res = httpRequest[type.toLowerCase()](url, data, header)
  }
  return res
}

/**
 * @description checkResult
 */
export const checkResult = (result) => {
  return result && result.data && result.data.head.code === 1
}

/**
 * @description getResultData
 */
export const getResultData = (result) => {
  return result.data.body.data
}

/**
 * @description getResultData
 */
export const checkAndGetResult = (result) => {
  if (checkResult(result)) {
    return getResultData(result)
  }
}
