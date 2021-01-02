import {useState, useEffect} from 'react'
import {createModel} from 'hox'
import {getUserInfo} from '../api/user'

function useUser() {
  const [user, setUser] = useState({})
  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    const res = await getUserInfo()
    console.log('getUserInfo', res)
    setUser(res)
  }
  return {
    user,
    getUser,
  }
}

const useUserModel = createModel(useUser)

export {useUserModel}
