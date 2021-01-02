import React, {useState, useEffect} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs, AtTabsPane} from 'taro-ui'
import './index.scss'
import OrderCard from '@/components/orderCard'

const tabList = [
  {title: '待支付'},
  {title: '进行中'},
  {title: '已开奖'},
  {title: '中奖单'},
  {title: '未生效'},
  {title: '全部'},
]

export default function () {
  const [currentTab, setCurrentTab] = useState(0)
  const [orderList, setOrderList] = useState([])
  useEffect(() => {
    setOrderList([
      {
        id: 1,
        type: 0, // 0: 抢夺单，1: 福利单
        status: 2, // 1: 进行中；2: 已开奖；3: 已关闭
        winning: 1, // 1: 中奖；0: 未中奖
        payed: 1, // 1: 已支付，0: 待支付
        used: 1, // 1: 已使用, 2: 未使用
        totalPeople: 10,
        hasPeople: 10,
        goodsId: 1,
        goodsName: '绿色冰糖西瓜3kg',
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
        count: 3,
        price: 8,
        totalAmount: 24,
        startTime: '',
        endTime: '',
      },
    ])
  }, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  const changeCondition = (index) => {
    setCurrentTab(index)
  }

  return (
    <View className="order">
      <AtTabs
        scroll
        current={currentTab}
        tabList={tabList}
        onClick={changeCondition}>
        <AtTabsPane current={currentTab} index={0}>
          <View className="order-list">
            {orderList.map((item) => {
              return (
                <View key={item.id} className="order-item">
                  <OrderCard order={item} />
                </View>
              )
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <View className="order-list">
            {orderList.map((item) => {
              return (
                <View key={item.id} className="order-item">
                  <OrderCard order={item} />
                </View>
              )
            })}
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}
