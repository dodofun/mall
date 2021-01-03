import React, {useState, useEffect} from 'react'
import {View} from '@tarojs/components'
import CouponCard from '@/components/coupon'
import './index.scss'

export default function () {
  const [couponList, setCouponList] = useState([])

  useEffect(() => {
    setCouponList([
      {
        id: 1,
        owner: 1,
        amount: 1,
        validityPeriod: 1609799495948, // 有效期
        used: false, // false:未使用，true: 已使用
        name: '【优惠券】1元优惠券',
        note: '满10元可用，仅限购买水果 类使用 ',
      },
      {
        id: 2,
        owner: 1,
        amount: 10,
        validityPeriod: 1609596495948, // 有效期
        used: true, // false:未使用，true: 已使用
        name: '【优惠券】1元优惠券',
        note: '满10元可用，仅限购买水果 类使用 ',
      },
    ])
  }, [])

  return (
    <View className="coupon">
      <View className="title">满减优惠券</View>
      {couponList &&
        couponList.map((item) => {
          return (
            <CouponCard className="coupon-item" key={item.id} coupon={item} />
          )
        })}
    </View>
  )
}
