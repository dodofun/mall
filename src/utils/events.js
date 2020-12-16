import Taro, {Events} from '@tarojs/taro'

/***
 * 获取全局消息中心
 */
export const getEventCenter = () => {
  return Taro.eventCenter
}

/***
 * 获取 event 实例
 */
export const getEventInstance = () => {
  return new Events()
}
