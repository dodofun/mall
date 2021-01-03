import React, {useState, useEffect} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import OrderCard from '@/components/orderCard'
import {AtNoticebar} from 'taro-ui'
import './index.scss'

export default function () {
  const [shopInfo, setShopInfo] = useState({})
  const [orderDetail, setOrderDetail] = useState({})

  useEffect(() => {
    setShopInfo({
      id: 1,
      address: '保利罗兰香谷二区社区惠民超市',
      mobile: '18513971114',
    })
    setOrderDetail({
      id: 4,
      type: 0, // 0: 抢夺单，1: 福利单
      status: 1, // 1: 进行中；2: 已开奖；3: 已关闭
      winning: false, // 1: 中奖；0: 未中奖
      payed: false, // 1: 已支付，0: 待支付
      used: false, // 1: 已使用, 0: 未使用
      totalPeople: 10,
      hasPeople: 8,
      goodsId: 1,
      goodsName: '绿色冰糖西瓜3kg',
      cover:
        'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
      count: 3,
      price: 8,
      totalAmount: 24,
      startTime: 1609596415948,
      endTime: 1609896495948,
      exchangeCode: 'demo',
    })
  }, [])

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
          <View className="mobile">{shopInfo.mobile}</View>
        </View>
        <Image
          className="address-line"
          src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/app-pay/%E7%BB%84%2010%402x.png"
        />
      </View>
      <View className="notice">
        <AtNoticebar icon="volume-plus">
          抢夺失败可领取对应金额的优惠券呦
        </AtNoticebar>
      </View>
      <View className="order-card">
        <OrderCard order={orderDetail} />
      </View>
    </View>
  )
}
