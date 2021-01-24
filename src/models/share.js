import {useState, useEffect} from 'react'
import {createModel} from 'hox'
import {useShopModel} from '@/models/shop'

function useShare() {
  const {shop} = useShopModel((model) => [model.shop])
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
