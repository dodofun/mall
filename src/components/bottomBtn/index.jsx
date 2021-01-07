import React from 'react'
import {View} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import './index.scss'

export default function ({text, onClick = () => {}}) {
  return (
    <View className="bottom-bar">
      <AtButton
        className="btn"
        onClick={() => {
          onClick()
        }}>
        {text}
      </AtButton>
    </View>
  )
}
