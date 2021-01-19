import React, {useState, useEffect} from 'react'
import {View} from '@tarojs/components'
import CouponCard from '@/components/coupon'
import './index.scss'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import {useUserModel} from '@/models/user'

export default function () {
  const {user} = useUserModel((model) => [model.user])
  const [couponList, setCouponList] = useState([])

  useEffect(() => {
    init()
  }, [user.id])

  const init = async () => {
    if (!user.id) {
      return
    }
    commonHttpRequest(
      'coupon',
      'getList',
      {ownerId: user.id},
      {valid: true},
    ).then((res) => {
      setCouponList(checkAndGetResult(res))
    })
  }

  return (
    <View className="coupon">
      <View className="title">满减优惠券</View>
      {couponList.map((item) => {
        return (
          <CouponCard className="coupon-item" key={item.id} coupon={item} />
        )
      })}
    </View>
  )
}
