import Taro, {useRouter, useDidShow} from '@tarojs/taro'
import {useEffect} from 'react'
import './app.scss'
import {init} from './init'
import {login} from './action/user'
import {useUserModel} from '@/models/user'
import {useCurrentShopModel} from '@/models/currentShop'

const App = (props) => {
  const userModel = useUserModel((model) => [model.updateUser])
  const router = useRouter()
  const params = router.params

  const {setShopId} = useCurrentShopModel((model) => [model.shopId])

  useDidShow(() => {
    init()
    initApp()
  })

  useEffect(() => {
    if (params.shopId) {
      initShop()
    }
  }, [params.shopId])

  const initApp = async () => {
    // 登录
    const userInfo = await login()
    Taro.setStorageSync('userInfo', userInfo || {})
    userModel.updateUser()

    // 初始化shop
    initShop()
  }

  const initShop = async () => {
    // 设置商铺ID
    setShopId(params.shopId)
  }

  return props.children
}

export default App
