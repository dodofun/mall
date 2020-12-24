import React, {useEffect} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {useCounterModelWithInitialValue} from '@/models/counter'
import {AtButton, AtDivider} from 'taro-ui'
import './index.scss'

export default function () {
  const counter = useCounterModelWithInitialValue((model) => [model.count]) // 传入一个 depsFn 函数，来精确控制订阅的字段

  useEffect(() => {}, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Text>{counter.count}</Text>
      <AtDivider />
      <AtButton onClick={counter.increment}>Increment</AtButton>
    </View>
  )
}
