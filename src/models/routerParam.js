import {useState, useEffect} from 'react'
import {createModel} from 'hox'
import {useRouter} from '@tarojs/taro'

function useRouterParam() {
  const router = useRouter()
  const [params, setParams] = useState({})
  useEffect(() => {
    console.log('eeee', router)
    setParams(router.params)
  }, [router])

  return {
    router,
    params,
  }
}

const useRouterParamModel = createModel(useRouterParam)

export {useRouterParamModel}
