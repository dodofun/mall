import React from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import './index.scss'
import dayjs from 'dayjs'

export default function ({coupon, hideBtn = false}) {
  const parseTime = (val) => {
    return dayjs(val).format('YYYY年MM月DD日')
  }

  const useCoupon = () => {
    // 跳转到店铺主页
    Taro.switchTab({url: `/pages/index/index?owner=${coupon.owner}`})
  }

  return (
    <View className="coupon-card">
      <View className="content">
        <View className="coupon-icon">￥{coupon.amount}</View>
        <View className="coupon-detail">
          <View className="name">{coupon.name}</View>
          <View className="note">{coupon.note}</View>
        </View>
      </View>
      {!coupon.used && (
        <View className="footer1">
          <View className="validity-period">
            有效期至{parseTime(coupon.validityPeriodEnd)}
          </View>
          {!hideBtn && (
            <View className="btn">
              <AtButton
                className="use-btn"
                size="small"
                onClick={() => useCoupon()}>
                使用优惠券
              </AtButton>
            </View>
          )}
        </View>
      )}
      {coupon.used && (
        <View className="footer2">
          <View className="used-text">已使用</View>
        </View>
      )}
    </View>
  )
}
