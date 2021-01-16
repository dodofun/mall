import {useState, useEffect} from 'react'
import {createModel} from 'hox'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import {useUserModel} from '@/models/user'

/***
 * 商户端
 */
function useShop() {
  const [shop, setShop] = useState({})
  const {user} = useUserModel((model) => [model.user])

  const updateShop = () => {
    commonHttpRequest(
      'shop',
      'getList',
      {ownerId: user.id},
      {index: 0, size: 1},
    ).then((res) => {
      const list = checkAndGetResult(res)
      if (list) {
        setShop(list[0])
      }
    })
  }

  useEffect(() => {
    updateShop()
  }, [user])

  return {
    shop,
    updateShop,
  }
}

const useShopModel = createModel(useShop)

export {useShopModel}
