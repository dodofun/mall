import React, {useEffect} from 'react'
import {View, Image} from '@tarojs/components'
import {AtProgress, AtCountdown} from 'taro-ui'
import './index.scss'
import {cardTagIcon} from '@/config'
import Taro from '@tarojs/taro'

export default function ({goods}) {
  useEffect(() => {}, [])
  const goDetail = () => {
    Taro.navigateTo({url: `/pages/goodsDetail/index?id=${goods.id}`})
  }

  return (
    <View className="goods-card" onClick={goDetail}>
      <View className="tag">
        <Image className="tag-icon" src={cardTagIcon[0]} />
        <View className="tag-info">{goods.totalPeople}人抢</View>
      </View>
      <View className="main">
        <Image src={goods.cover} className="cover" />
        <View className="name">{goods.name}</View>
        <View className="num">当前参加人数：{goods.hasPeople} 人</View>
        <View className="progress">
          <AtProgress
            percent={50}
            strokeWidth={6}
            status="progress"
            color="#FAD000"
          />
        </View>
        <View className="timer">
          <Image
            class="timer-icon"
            src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E7%BB%84%2018%402x.png"
          />
          <AtCountdown
            className="timer-main"
            isShowHour
            format={{hours: ':', minutes: ':', seconds: ''}}
            day={2}
            hours={1}
            minutes={1}
            seconds={10}
          />
        </View>
        <View className="goods-footer">
          <View className="price">￥{goods.price}</View>
          <Image
            className="action"
            src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E6%8C%89%E9%92%AE%402x.png"
          />
        </View>
      </View>
    </View>
  )
}
