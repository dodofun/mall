import React, {useEffect, useState} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import dayjs from 'dayjs'
import './index.scss'

export default function () {
  const [list, setList] = useState([])
  useEffect(() => {
    setList([
      {
        id: 1,
        shopName: '惠明超市',
        amount: 432,
        createAt: 1609999179948,
      },
      {
        id: 2,
        shopName: '惠明超市',
        amount: 20,
        createAt: 1609999179948,
      },
      {
        id: 3,
        shopName: '惠明超市',
        amount: 432,
        createAt: 1609999179948,
      },
      {
        id: 4,
        shopName: '惠明超市',
        amount: 432,
        createAt: 1609999179948,
      },
      {
        id: 5,
        shopName: '惠明超市',
        amount: 432,
        createAt: 1609999179948,
      },
    ])
  }, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="b-withdrawal-record">
      <View className="list">
        {list.map((item) => {
          return (
            <View className="record" key={item.id}>
              <View className="left">
                <View className="name">{item.shopName}</View>
                <View className="time">
                  {dayjs(item.createAt).format('YYYY.MM.DD HH:mm')}
                </View>
              </View>
              <View className="right">+￥{item.amount}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
