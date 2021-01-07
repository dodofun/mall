import React, {useEffect, useState} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import BottomBtn from '@/components/bottomBtn'
import WithdrawalCard from '@/components/withdrawalCard'
import {AtInput} from 'taro-ui'

export default function () {
  const rate = '0.20'
  const minAmount = '0.10'
  const [amount, setAmount] = useState({
    canWithdrawn: 0,
    withdrawned: 0,
    totalIncome: 0,
  })
  const [inputVal, setInputVal] = useState('')
  const [fee, setFee] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setAmount({
      canWithdrawn: 23411.0,
      withdrawned: 2000.0,
      totalIncome: 30000.0,
    })
  }, [])

  useEffect(() => {
    const res = Math.round(inputVal * rate) / 100
    setFee(res > minAmount ? res : minAmount)
  }, [inputVal])

  useEffect(() => {
    loading && Taro.showLoading({title: '正在提现...'})
    !loading && Taro.hideLoading()
  }, [loading])

  const withdrawal = () => {
    console.log('withdrawal')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="b-withdrawal">
      <WithdrawalCard amount={amount} />
      <View className="amount-card">
        <View className="title">提现金额</View>
        <View className="input">
          <AtInput
            clear
            border={false}
            title="￥"
            placeholder={`当前可提现金额￥${amount.canWithdrawn}`}
            type="digit"
            value={inputVal}
            onChange={(val) => {
              setInputVal(val)
            }}>
            <View
              className="all-btn"
              onClick={() => {
                setInputVal(amount.canWithdrawn)
              }}>
              全部提现
            </View>
          </AtInput>
        </View>
        <View className="cell">
          <View className="label-start">费率</View>
          <View className="label-end">
            {rate}%(最低￥{minAmount})
          </View>
        </View>
        <View className="cell">
          <View className="label-start">服务费</View>
          <View className="label-end">￥{fee}</View>
        </View>
      </View>
      <BottomBtn disabled={loading} text="立即提现" onClick={withdrawal} />
    </View>
  )
}
