import {useState, useEffect} from 'react'
import {createModel} from 'hox'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'

/***
 * C端用户
 */
function useCurrentShop() {
  const shopOwnerId = 1
  const [shopId, setShopId] = useState(0)
  const [shop, setShop] = useState()

  useEffect(() => {
    getShop()
  }, [shopId])

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
  }
}

const useCurrentShopModel = createModel(useCurrentShop)

export {useCurrentShopModel}
