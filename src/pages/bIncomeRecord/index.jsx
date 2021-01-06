import React, {useEffect, useState} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import IncomeCard from '@/components/incomeCard'
import './index.scss'

export default function () {
  const [list, setList] = useState([])

  useEffect(() => {
    setList([
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
        totalIncome: 50,
        startTime: 1609596415948,
        endTime: 1609596495948,
        exchangeCode: 'demo',
      },
    ])
  }, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="b-income-record">
      <View className="list">
        {list.map((item) => {
          return <IncomeCard key={item.id} record={item} />
        })}
      </View>
    </View>
  )
}
