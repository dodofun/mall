import React, {useState, useEffect} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs, AtActivityIndicator} from 'taro-ui'
import './index.scss'
import OrderCard from '@/components/bOrderCard'

const tabList = [
  {title: '待支付'},
  {title: '进行中'},
  {title: '已开奖'},
  {title: '已关闭'},
  {title: '全部'},
]

export default function () {
  const [currentTab, setCurrentTab] = useState(0)
  const [openLoading, setOpenLoading] = useState(false)

  const [orderList, setOrderList] = useState([])
  useEffect(() => {
    setOrderList([
      {
        id: 4,
        type: 0, // 0: 抢夺单，1: 福利单
        status: 3, // 1: 进行中；2: 已开奖；3: 已关闭
        winning: false, // 1: 中奖；0: 未中奖
        payed: true, // 1: 已支付，0: 待支付
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
        endTime: 1610696495948,
        exchangeCode: 'demo',
      },
      {
        id: 3,
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
        endTime: 1609899179948,
        exchangeCode: 'demo',
      },
      {
        id: 1,
        type: 1, // 0: 抢夺单，1: 福利单
        status: 2, // 1: 进行中；2: 已开奖；3: 已关闭
        winning: true, // 1: 中奖；0: 未中奖
        payed: true, // 1: 已支付，0: 待支付
        used: false, // 1: 已使用, 0: 未使用
        totalPeople: 10,
        hasPeople: 10,
        goodsId: 1,
        goodsName: '绿色冰糖西瓜3kg',
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E7%BB%84%2015%402x.png',
        count: 3,
        price: 8,
        totalAmount: 24,
        startTime: 1609596415948,
        endTime: 1609599455948,
        exchangeCode: 'demo',
      },
      {
        id: 2,
        type: 0, // 0: 抢夺单，1: 福利单
        status: 2, // 1: 进行中；2: 已开奖；3: 已关闭
        winning: true, // 1: 中奖；0: 未中奖
        payed: true, // 1: 已支付，0: 待支付
        used: true, // 1: 已使用, 0: 未使用
        totalPeople: 10,
        hasPeople: 10,
        goodsId: 1,
        goodsName: '绿色冰糖西瓜3kg',
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
        count: 3,
        price: 8,
        totalAmount: 24,
        startTime: 1609596415948,
        endTime: 1609596495948,
        exchangeCode: 'demo',
      },
    ])
  }, [])

  useEffect(() => {
    // 切换tab时，更新数据
    setOpenLoading(true)
    setTimeout(() => {
      setOpenLoading(false)
    }, 2000)
  }, [currentTab])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  const changeCondition = (index) => {
    setCurrentTab(index)
  }

  return (
    <View className="order">
      <AtTabs
        className="tabs"
        scroll
        current={currentTab}
        tabList={tabList}
        onClick={changeCondition}></AtTabs>
      <View className="order-list">
        <View className="offset"></View>
        {orderList.map((item) => {
          return (
            <View key={item.id} className="order-item">
              <OrderCard order={item} />
            </View>
          )
        })}
      </View>
      <AtActivityIndicator
        className="loading"
        isOpened={openLoading}
        mode="center"
        content="Loading..."
      />
    </View>
  )
}
