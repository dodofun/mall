import React, {useState, useEffect} from 'react'
import Taro, {useRouter, useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import OrderCard from '@/components/orderCard'
import './index.scss'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'

export default function () {
  const router = useRouter()
  const params = router.params

  const [shopInfo, setShopInfo] = useState({})
  const [orderDetail, setOrderDetail] = useState({})

  useEffect(() => {
    init()
  }, [params.userId, params.orderId])

  const init = () => {
    commonHttpRequest('order', 'get', {
      ownerId: params.userId,
      id: params.orderId,
    }).then((res) => {
      const order = checkAndGetResult(res)
      console.log('order', order)
      if (order) {
        setShopInfo(order.shop)
        setOrderDetail(order)
      }
    })
  }
  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="order-detail">
      <View className="head">
        <View className="address">
          <View className="icon">领取地址</View>
          <View className="address-detail">{shopInfo.address}</View>
        </View>
        <View className="connect">
          <View className="label">联系电话</View>
          <View
            className="mobile"
            onClick={() => {
              if (shopInfo.mobile) {
                Taro.makePhoneCall({phoneNumber: shopInfo.mobile})
              }
            }}>
            {shopInfo.mobile}
          </View>
        </View>
        <Image
          className="address-line"
          src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/app-pay/%E7%BB%84%2010%402x.png"
        />
      </View>

      <View className="order-card">
        <OrderCard order={orderDetail} />
      </View>
    </View>
  )
}
