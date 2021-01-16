import Taro from '@tarojs/taro'
import {useEffect} from 'react'
import './app.scss'
import {init} from './init'
import {login} from './action/user'
import {useUserModel} from '@/models/user'

const App = (props) => {
  const userModel = useUserModel((model) => [model.updateUser])
  useEffect(() => {
    // 登录
    login().then((userInfo) => {
      Taro.setStorageSync('userInfo', userInfo || {})
      userModel.updateUser()
      init()
    })
  }, [])

  return props.children
}

export default App
