import {useState, useEffect} from 'react'
import Taro from '@tarojs/taro'
import {createModel} from 'hox'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import {useUserModel} from '@/models/user'

/***
 * 商户端
 */
function useShop() {
  const [shop, setShop] = useState({})
  const {user} = useUserModel((model) => [model.user])

  useEffect(() => {
    const localShop = Taro.getStorageSync('shop')
    if (localShop) {
      setShop(localShop)
    }
  }, [])

  useEffect(() => {
    updateShop()
  }, [user])

  const updateShop = () => {
    if (!user.id) {
      return
    }
    commonHttpRequest(
      'shop',
      'getList',
      {ownerId: user.id},
      {index: 0, size: 1},
    ).then((res) => {
      const list = checkAndGetResult(res)
      if (list) {
        setShop(list[0])
        Taro.setStorageSync('shop', list[0])
      }
    })
  }

  return {
    shop,
    updateShop,
  }
}

const useShopModel = createModel(useShop)

export {useShopModel}
