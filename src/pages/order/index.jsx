import React from 'react'
import {
  useDidHide,
  useDidShow,
  usePullDownRefresh,
  useReady,
} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import './index.scss'
import OrderCard from '@/components/orderCard'
import {useOrderModel} from '@/models/order'

const tabList = [
  {title: '待支付'},
  {title: '进行中'},
  {title: '已开奖'},
  {title: '已关闭'},
  {title: '全部'},
]

export default function () {
  const {
    orderList,
    status,
    setStatus,
    setRefreshTime,
  } = useOrderModel((model) => [model.status, model.orderList])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  usePullDownRefresh(() => {
    setRefreshTime(new Date().getTime())
  })

  const changeCondition = (index) => {
    setStatus(index)
  }

  return (
    <View className="order">
      <AtTabs
        className="tabs"
        scroll
        current={status}
        tabList={tabList}
        onClick={changeCondition}></AtTabs>
      <View className="order-list">
        <View className="offset"></View>
        {orderList.length > 0 &&
          orderList.map((item) => {
            return (
              <View key={item.id} className="order-item">
                <OrderCard order={item} />
              </View>
            )
          })}
      </View>
    </View>
  )
}
