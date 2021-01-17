import {useState, useEffect} from 'react'
import Taro from '@tarojs/taro'
import {createModel} from 'hox'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import {useUserModel} from '@/models/user'

/***
 * 商户端
 */
function useOrder() {
  const pageSize = 20
  const [pageIndex, setPageIndex] = useState(0)
  const [orderList, setOrderList] = useState([])
  const [status, setStatus] = useState(1)
  const {user} = useUserModel((model) => [model.user])
  const [openLoading, setOpenLoading] = useState(false)

  useEffect(() => {
    setPageIndex(0)
    updateOrder()
  }, [user.id, status])

  useEffect(() => {
    if (openLoading) {
      Taro.showLoading({title: '加载中'})
    } else {
      Taro.hideLoading()
    }
  }, [openLoading])

  const updateOrder = () => {
    if (!user.id) {
      return
    }
    setOpenLoading(true)
    commonHttpRequest(
      'order',
      'getList',
      {ownerId: user.id},
      {index: pageIndex, size: pageSize},
    ).then((res) => {
      setOpenLoading(false)
      const list = checkAndGetResult(res)
      if (list) {
        setOrderList(list)
      } else {
        setOrderList([])
      }
    })
  }

  return {
    status,
    orderList,
    setStatus,
  }
}

const useOrderModel = createModel(useOrder)

export {useOrderModel}
