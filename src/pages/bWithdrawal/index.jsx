import React, {useEffect, useState} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import BottomBtn from '@/components/bottomBtn'
import WithdrawalCard from '@/components/withdrawalCard'
import {AtInput} from 'taro-ui'
import {commonHttpRequest} from '@/utils/servers/utils'
import {createId} from '../../utils/idCreator'
import {checkAndGetResult} from '../../utils/servers/utils'
import {useShopModel} from '@/models/shop'
import {getTotalIncome} from '@/action/order'
import dayjs from 'dayjs'

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
  const [penddingRecord, setPenddingRecord] = useState([])

  const {shop} = useShopModel((model) => [model.shop])

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getTotalIncome(shop.id).then((res) => {
      if (res) {
        setAmount(res.totalIncome)
        setAmount({
          canWithdrawn: res.amount || 0,
          withdrawned: res.withdrawalAmount || 0,
          totalIncome: res.totalIncome || 0,
        })
      }
    })

    commonHttpRequest(
      'withdrawalRecord',
      'getList',
      {ownerId: shop.id},
      {index: 0, size: 1},
    ).then((res) => {
      const resList = checkAndGetResult(res)
      if (resList) {
        const list = resList.filter((item) => !item.status)
        setPenddingRecord(list)
      } else {
        setPenddingRecord([])
      }
    })
  }

  const withdrawal = () => {
    if (inputVal <= 0) {
      Taro.showToast({title: '请输入提现金额', icon: 'none'})
      return
    }
    // TODO 验证提现金额大小

    const id = createId()
    const formData = {
      id,
      ownerId: shop.id,
      name: shop.name,
      amount: inputVal,
      feeRate: rate,
      feeAmount: fee,
      enabled: true,
    }
    setLoading(true)
    commonHttpRequest(
      'withdrawalRecord',
      'add',
      {ownerId: shop.id, id},
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
      <View className="pendding-card">
        {penddingRecord.map((item) => {
          return (
            <View key={item.id} className="pendding-item">
              <View className="header-label">
                {dayjs(item.createdAt).format('YYYY年MM月DD日 HH:mm:ss')}
                ，提现金额
                {item.amount}元
              </View>
              <View className="status-txt">审核中</View>
            </View>
          )
        })}
      </View>
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
      <View className="footer-tip">*提现发起后，审核通过后1至2日到账</View>
      <BottomBtn disabled={loading} text="立即提现" onClick={withdrawal} />
    </View>
  )
}
