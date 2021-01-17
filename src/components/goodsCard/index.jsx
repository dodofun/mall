import React, {useState, useEffect} from 'react'
import {View, Image} from '@tarojs/components'
import {AtProgress} from 'taro-ui'
import {cardTagIcon} from '@/config'
import Taro from '@tarojs/taro'
import Timer from '../timer'
import './index.scss'
import dayjs from 'dayjs'

export default function ({goods}) {
  const [ended, setEnded] = useState(dayjs(goods.endTime) - dayjs() < 0)

  useEffect(() => {}, [])
  const goDetail = () => {
    Taro.navigateTo({
      url: `/pages/goodsDetail/index?shopId=${goods.ownerId}&goodsId=${goods.id}`,
    })
  }

  return (
    <View className="goods-card" onClick={goDetail}>
      <View className="tag">
        <Image className="tag-icon" src={cardTagIcon[0]} />
        <View className="tag-info">{goods.totalPeople}人抢</View>
      </View>
      <View className="main">
        <Image src={goods.cover} className="cover" lazyLoad />
        <View className="name">{goods.name}</View>
        <View className="num">当前参加人数：{goods.hasPeople || 0} 人</View>
        <View className="progress">
          <AtProgress
            percent={Math.round(
              ((goods.hasPeople || 0) / goods.totalPeople) * 100,
            )}
            strokeWidth={6}
            status="progress"
            color="#FAD000"
          />
        </View>
        {ended && <View className="ended">已结束</View>}
        {!ended && (
          <Timer
            className="timer"
            endTime={goods.endTime}
            onSetEnded={(val) => {
              setEnded(val)
            }}
          />
        )}
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
