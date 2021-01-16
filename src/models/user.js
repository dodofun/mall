import Taro from '@tarojs/taro'
import {useState, useEffect} from 'react'
import {createModel} from 'hox'

function useUser() {
  const [user, setUser] = useState({})

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    const userInfo = Taro.getStorageSync('userInfo') || {}
    setUser(userInfo)
    return userInfo
  }

  return {
    user,
    getUser,
  }
}

const useUserModel = createModel(useUser)

export {useUserModel}
