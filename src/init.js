import Taro from '@tarojs/taro'
import {updateApp} from '@/utils/update'
import {isWeapp} from '@/utils/common'
import {queryAppinfo} from './action/common'

export const init = () => {
  // 更新app
  updateApp()
  // 获取 app 信息
  queryAppinfo().then((res) => {
    Taro.setStorageSync('appInfo', res)
  })

  if (isWeapp()) {
    // 找不到页面时，回到首页
    Taro.onPageNotFound(() => {
      Taro.reLaunch({url: '/pages/index/index'})
    })

    // 监听小程序切前台事件
    Taro.onAppShow((result) => {
      console.log('onAppShow:', result)
    })

    // 监听小程序切前台事件
    Taro.onAppHide((result) => {
      console.log('onAppHide:', result)
    })

    // 错误监听
    Taro.onError((error) => {
      console.error('onError:', error)
    })
  }
}
