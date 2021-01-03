import React, {useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import {APP_CONSTANTS} from '@/config'
import './index.scss'

export default function () {
  useEffect(() => {}, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="contact-us">
      <Image
        className="icon"
        src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E7%BB%84%2014%402x.png"
      />
      <View className="tip">暂无相关内容~</View>
      <View className="btn">
        <AtButton
          full
          className="btn-call"
          onClick={() => {
            Taro.makePhoneCall({phoneNumber: APP_CONSTANTS.CUSTOMER_SERVICE})
          }}>
          客服热线
        </AtButton>
      </View>
      <View className="footer">温馨提示：客服工作时间9:00-23:00</View>
    </View>
  )
}
