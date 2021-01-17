import React from 'react'
import {View, Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import './index.scss'
import Taro from '@tarojs/taro'

export default function () {
  return (
    <View className="pay-success">
      <View className="head">
        <Image
          className="icon"
          src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/pay-success/gou%20%282%29%402x.png"
        />
        <View className="text">支付成功</View>
      </View>
      <View className="step">
        <Image
          className="step-icon"
          src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/pay-success/%E7%BB%84%203%402x.png"
        />
        <View className="step-text">
          <View className="nomal">支付成功</View>
          <View className="active">等待开奖</View>
          <View className="nomal">领取商品</View>
        </View>
      </View>
      <View className="tip">您的订单已支付成功，请到【订单】内查看详情</View>
      <View className="bottom-bar">
        <AtButton
          className="back-btn"
          onClick={() => {
            Taro.switchTab({url: '/pages/index/index'})
          }}>
          返回首页
        </AtButton>
      </View>
    </View>
  )
}
