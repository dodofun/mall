import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import './index.scss'
import OrderCard from '@/components/bOrderCard'

const tabList = [
  {title: '进行中'},
  {title: '已开奖'},
  {title: '未生效'},
  {title: '未开始'},
  {title: '全部'},
]

export default function () {
  const [currentTab, setCurrentTab] = useState(0)
  const [openLoading, setOpenLoading] = useState(false)

  const [orderList, setOrderList] = useState([])
  useEffect(() => {
    setOrderList([
      {
        id: 2,
        type: 0, // 0: 抢夺单，1: 福利单
        status: 4, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
        totalPeople: 10,
        hasPeople: 8,
        goodsId: 1,
        goodsName: '绿色冰糖西瓜3kg',
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
        count: 3,
        price: 8,
        totalAmount: 24,
        startTime: 1610696495948,
        endTime: 1610699495948,
        exchangeCode: 'demo',
      },
      {
        id: 4,
        type: 0, // 0: 抢夺单，1: 福利单
        status: 1, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
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
        id: 5,
        type: 0, // 0: 抢夺单，1: 福利单
        status: 2, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
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
        id: 1,
        type: 0, // 0: 抢夺单，1: 福利单
        status: 3, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
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
        id: 1,
        type: 1, // 0: 抢夺单，1: 福利单
        status: 1, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
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

  useEffect(() => {
    if (openLoading) {
      Taro.showLoading({title: '加载中'})
    } else {
      Taro.hideLoading()
    }
  }, [openLoading])

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
        onClick={changeCondition}
      />
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
    </View>
  )
}
