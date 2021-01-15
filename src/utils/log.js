import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import {isProd} from './common'

const log = (name, action, info) => {
  info = info || ''

  let deviceInfo = ''

  try {
    deviceInfo = Taro.getSystemInfoSync()
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message)
  }

  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')

  if (isProd) {
    // TODO 上报日志系统
    console.error(time, name, action, info, deviceInfo)
  } else {
    console.error(time, name, action, info, deviceInfo)
  }
}

export default log
