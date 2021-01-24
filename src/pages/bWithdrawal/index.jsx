import React, {useEffect, useState} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import BottomBtn from '@/components/bottomBtn'
import WithdrawalCard from '@/components/withdrawalCard'
import {AtInput} from 'taro-ui'
import {commonHttpRequest} from '@/utils/servers/utils'
import {useUserModel} from '@/models/user'
import {createId} from '../../utils/idCreator'
import {checkAndGetResult} from '../../utils/servers/utils'

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

  const {user} = useUserModel((model) => [model.user])

  useEffect(() => {
    setAmount({
      canWithdrawn: 23411.0,
      withdrawned: 2000.0,
      totalIncome: 30000.0,
    })
  }, [])

  const withdrawal = () => {
    if (inputVal <= 0) {
      Taro.showToast({title: '请输入提现金额', icon: 'none'})
      return
    }
    // TODO 验证提现金额大小

    const id = createId()
    const formData = {
      id,
      ownerId: user.id,
      name: '申请提现',
      amount: inputVal,
      feeRate: rate,
      feeAmount: fee,
      enabled: true,
    }
    setLoading(true)
    commonHttpRequest(
      'withdrawalRecord',
      'add',
      {ownerId: user.id, id},
      {},
      formData,
    ).then((res) => {
      setLoading(false)
      if (checkAndGetResult(res)) {
        Taro.showToast({title: '成功发起提现申请', icon: 'none'})
        setTimeout(() => {
          // 跳转页面
          Taro.navigateBack()
        }, 600)
      }
    })
  }

  useEffect(() => {
    const res = Math.round(inputVal * rate) / 100
    setFee(res > minAmount ? res : minAmount)
  }, [inputVal])

  useEffect(() => {
    loading && Taro.showLoading({title: '正在提现...'})
    !loading && Taro.hideLoading()
  }, [loading])

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
