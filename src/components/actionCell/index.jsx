import React from 'react'
import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import './index.scss'

export default function ({action}) {
  const handle = () => {
    if (!action.url) {
      return
    }
    if (action.isTab) {
      Taro.switchTab({
        url: action.url,
      })
    } else {
      Taro.navigateTo({
        url: action.url,
      })
    }
  }

  return (
    <View className="action-cell" onClick={handle}>
      <View className="left">
        <Image className="icon" src={action.icon} />
        <View className="label">{action.label}</View>
      </View>
      <AtIcon
        className="right"
        value="chevron-right"
        size="16"
        color="#999999"
      />
    </View>
  )
}
