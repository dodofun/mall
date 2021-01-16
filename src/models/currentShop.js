import {useState, useEffect} from 'react'
import {createModel} from 'hox'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'

/***
 * C端用户
 */
function useCurrentShop() {
  const [shopOwnerId, setShopOwnerId] = useState(0)
  const [shopId, setShopId] = useState(0)
  const [shop, setShop] = useState()

  useEffect(() => {
    if (shopOwnerId > 0 && shopId > 0) {
      getShop()
    }
  }, [shopOwnerId, shopId])

  const getShop = () => {
    if (shop) {
      return
    }
    if (shopId > 0) {
      commonHttpRequest('shop', 'get', {ownerId: shopOwnerId, id: shopId}).then(
        (res) => {
          const data = checkAndGetResult(res)
          if (data) {
            setShop(data)
          }
        },
      )
    }
  }

  return {
    shop,
    setShopId,
    setShopOwnerId,
  }
}

const useCurrentShopModel = createModel(useCurrentShop)

export {useCurrentShopModel}
