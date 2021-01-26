import Taro, {useRouter, useDidShow} from '@tarojs/taro'
import './app.scss'
import {init} from './init'
import {login} from './action/user'
import {useUserModel} from '@/models/user'
import {useCurrentShopModel} from '@/models/currentShop'
import {APP_CONSTANTS} from './config/index'

const App = (props) => {
  const userModel = useUserModel((model) => [model.updateUser])
  const router = useRouter()
  const params = router.params

  const paramsShopId = params.shopId || APP_CONSTANTS.DEFAULT_SHOP_ID

  const {setShopId} = useCurrentShopModel((model) => [model.shopId])

  useDidShow(() => {
    init()
    initApp()
  })

  const initApp = async () => {
    // 初始化用户
    const userInfo = await login()
    Taro.setStorageSync('userInfo', userInfo || {})
    userModel.updateUser()

    // 初始化shop
    setShopId(paramsShopId)
  }

  return props.children
}

export default App
