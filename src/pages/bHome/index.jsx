import React, {useEffect, useState} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import ActionCell from '@/components/actionCell'
import './index.scss'
import {useShopModel} from '@/models/shop'
import {getTotalIncome} from '@/action/order'

const actions = [
  {
    id: 'writeoff',
    label: '优惠核销',
    icon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/b-home/%E6%A0%B8%E9%94%80%402x.png',
    tailIcon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/b-home/%E6%89%AB%E7%A0%81%402x.png',
    url: '/pages/bWriteOff/index',
  },
  {
    label: '商品上架',
    icon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/b-home/%E4%B8%8A%E6%9E%B6%402x.png',
    url: '/pages/bPutOn/index',
    isTab: false,
  },
  {
    label: '福利发布',
    icon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/b-home/%E7%A6%8F%E5%88%A9%402x.png',
    url: '/pages/bWelfarePutOn/index',
  },
  {
    label: '订单管理',
    icon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/b-home/%E7%AE%A1%E7%90%86%20%281%29%20%E6%8B%B7%E8%B4%9D%402x.png',
    url: '/pages/bOrder/index',
  },
]

export default function () {
  const {shop} = useShopModel((model) => [model.shop])
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getTotalIncome(shop.id).then((res) => {
      if (res) {
        setAmount(res.totalIncome)
      }
    })
  }

  const goto = (url) => {
    Taro.navigateTo({url})
  }

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="b-home">
      <View className="head">
        <View
          className="withdrawal"
          onClick={() => {
            goto('/pages/bWithdrawal/index')
          }}>
          提现
        </View>
        <View className="income">
          <View className="tite">累计收益金额</View>
          <View className="amount">￥{amount}</View>
        </View>
        <View className="footer">
          <View
            className="withdrawal-record"
            onClick={() => goto('/pages/bWithdrawalRecord/index')}>
            提现记录
          </View>
          <View
            className="income-record"
            onClick={() => goto('/pages/bIncomeRecord/index')}>
            收入明细
          </View>
        </View>
      </View>
      <View className="actions">
        {actions.map((item, index) => {
          return (
            <View key={index}>
              <ActionCell action={item} />
            </View>
          )
        })}
      </View>
    </View>
  )
}
