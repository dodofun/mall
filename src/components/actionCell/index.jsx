import React from 'react'
import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import './index.scss'
import {scanCode} from '@/utils/scanCode'

export default function ({action}) {
  const handle = async () => {
    // 核销
    if (action.id === 'writeoff') {
      const res = await scanCode()
      if (res && res.length === 2) {
        action.url = action.url + '?orderId=' + res[1] + '&ownerId=' + res[0]
      } else {
        Taro.showToast({title: '二维码无效', icon: 'none'})
        return
      }
    }

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
      {action.tailIcon && (
        <Image className="right-icon" src={action.tailIcon} />
      )}
      {!action.tailIcon && (
        <AtIcon
          className="right"
          value="chevron-right"
          size="16"
          color="#999999"
        />
      )}
    </View>
  )
}
