import {useState, useEffect} from 'react'
import {createModel} from 'hox'
import {useCurrentShopModel} from '@/models/currentShop'

function useShare() {
  const {shop} = useCurrentShopModel((model) => [model.shop])
  const [shareMsg, setShareMsg] = useState()

  useEffect(() => {
    setShareMsg({
      title: shop.name,
      path: `/pages/index/index?shopId=${shop.id}`,
    })
  }, [shop])

  return {
    shareMsg,
    setShareMsg,
  }
}

const useShareModel = createModel(useShare)

export {useShareModel}
