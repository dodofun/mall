import React from 'react'
import {View, Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default function () {
  return (
    <View className="review">
      <Image
        className="head-img"
        src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png"
      />
      <View className="tips">
        <View className="title">提交成功，请等待管理员审核！</View>
        <View className="sub-title">
          预计24小时内审核完毕，审核结果会电话通知到您的注册手机。
        </View>
      </View>
      <View className="bottom-bar">
        <AtButton
          className="btn"
          onClick={() => {
            Taro.switchTab({url: '/pages/index/index'})
          }}>
          返回首页
        </AtButton>
      </View>
    </View>
  )
}
