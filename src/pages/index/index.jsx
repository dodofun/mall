import React, {useEffect} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'

export default function () {
  useEffect(() => {}, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  )
}
