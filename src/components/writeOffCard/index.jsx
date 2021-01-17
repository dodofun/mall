import React from 'react'
import {View} from '@tarojs/components'
import './index.scss'
import Coupon from '../coupon'
import OrderCard from '../orderCard'

export default function ({data}) {
  const type = data.type
  const record = data.value

  return (
    <>
      {type === 0 && (
        <View className="coupon">
          <Coupon coupon={record} hideBtn />
        </View>
      )}
      {type === 1 && <OrderCard order={record} isBuss />}
    </>
  )
}
