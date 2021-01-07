import React, {useEffect, useState} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.scss'
import BottomBtn from '@/components/bottomBtn'

export default function () {
  const [amount, setAmount] = useState({
    canWithdrawn: 0,
    withdrawned: 0,
    totalIncome: 0,
  })
  useEffect(() => {
    setAmount({
      canWithdrawn: 23411.0,
      withdrawned: 2000.0,
      totalIncome: 30000.0,
    })
  }, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="b-withdrawal">
      <View className="head">
        <View className="title">
          <Image
            className="icon"
            src="https://assets.yiduohoulang.com/images/mall/app-tixian/%E7%9F%A2%E9%87%8F%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%402x.png"
          />
          <View className="label">可提现金额</View>
        </View>
        <View className="can-withdrawn">￥{amount.canWithdrawn}</View>
        <View className="footer">
          <View className="cell">
            <View className="text">提现已完成</View>
            <View className="amount">￥{amount.withdrawned}</View>
          </View>
          <View className="cell">
            <View className="text">累计收益金额</View>
            <View className="amount">￥{amount.totalIncome}</View>
          </View>
        </View>
      </View>
      <BottomBtn
        text="立即提现"
        onClick={() => {
          console.log('提现')
        }}
      />
    </View>
  )
}
