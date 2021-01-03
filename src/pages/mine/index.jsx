import React, {useEffect} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {useUserModel} from '@/models/user'
import {AtAvatar} from 'taro-ui'
import ActionCell from '@/components/actionCell'
import './index.scss'

const actions = [
  {
    label: '优惠券',
    icon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/app-mine/%E4%BC%98%E6%83%A0%E5%88%B8%402x.png',
    url: '/pages/coupon/index',
  },
  {
    label: '抢夺订单',
    icon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/app-mine/%E8%AE%A2%E5%8D%95%281%29%20%E6%8B%B7%E8%B4%9D%402x.png',
    url: '',
  },
  {
    label: '商家入驻',
    icon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/app-mine/%E5%95%86%E5%AE%B6%E5%85%A5%E9%A9%BB%402x.png',
    url: '',
  },
  {
    label: '联系我们',
    icon:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/app-mine/%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC-%E9%82%AE%E4%BB%B6%20%E6%8B%B7%E8%B4%9D%402x.png',
    url: '',
  },
]

export default function () {
  const user = useUserModel((model) => [model.user])

  useEffect(() => {}, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="mine">
      <View className="head">
        <AtAvatar className="avatar" circle image={user.user.avatar} />
        <View className="info">
          <View className="name">{user.user.name}</View>
          <View className="mobile">{user.user.mobile}</View>
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
