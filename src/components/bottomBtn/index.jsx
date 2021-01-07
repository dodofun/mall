import React from 'react'
import {View} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import './index.scss'

export default function ({
  disabled = false,
  loading = false,
  text,
  onClick = () => {},
}) {
  return (
    <View className="bottom-bar">
      <AtButton
        disabled={disabled}
        loading={loading}
        className="btn"
        onClick={() => {
          onClick()
        }}>
        {text}
      </AtButton>
    </View>
  )
}
