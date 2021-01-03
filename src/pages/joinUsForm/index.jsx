import React, {useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import './index.scss'

export default function () {
  useEffect(() => {}, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="join-us-form">
      <View className="btn">
        <AtButton
          full
          className="btn-join"
          onClick={() => {
            // 申请入驻
            Taro.navigateTo({url: '/pages/joinUsForm/index'})
          }}>
          申请入驻
        </AtButton>
      </View>
    </View>
  )
}
