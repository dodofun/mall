import Taro from '@tarojs/taro'
import {useState, useEffect} from 'react'
import {createModel} from 'hox'

function useUser() {
  const [user, setUser] = useState(Taro.getStorageSync('userInfo') || {})

  const updateUser = () => {
    setUser(Taro.getStorageSync('userInfo') || {})
  }

  useEffect(() => {
    updateUser()
  }, [])

  return {
    user,
    updateUser,
  }
}

const useUserModel = createModel(useUser)

export {useUserModel}
