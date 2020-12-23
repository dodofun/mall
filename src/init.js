import Taro from '@tarojs/taro'
import {updateApp} from '@/utils/update'
import {isWeapp} from '@/utils/common'

export const init = () => {
  // 更新app
  updateApp()

  if (isWeapp()) {
    // 找不到页面时，回到首页
    Taro.onPageNotFound(() => {
      Taro.reLaunch({url: '/pages/index/index'})
    })

    // 错误监听
    Taro.onError((error) => {
      console.error('onError:', error)
    })

    // 监听小程序切前台事件
    Taro.onAppShow((result) => {
      console.log('onAppShow:', result)
    })

    // 监听小程序切前台事件
    Taro.onAppHide((result) => {
      console.log('onAppHide:', result)
    })
  }
}
