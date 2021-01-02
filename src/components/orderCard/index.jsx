import React, {useEffect} from 'react'
import {View, Image, Text} from '@tarojs/components'
import {AtProgress, AtCountdown} from 'taro-ui'
import './index.scss'
import {cardTagIcon} from '@/config'

export default function ({order}) {
  const title = order.type === 1 ? '福利单' : '抢夺单'
  useEffect(() => {}, [])

  return (
    <View className="order-card">
      <View className="title">{title}</View>
      <View className="card">
        <View className="tag">
          <Image className="tag-icon" src={cardTagIcon[0]} />
          <View className="tag-info">{order.totalPeople}人抢</View>
        </View>
        <View className="main">
          <View className="left">
            <Image className="cover" src={order.cover} />
          </View>
          <View className="right">
            <View className="info">
              <View className="name">{order.goodsName}</View>
              <View className="num">参加人数：{order.hasPeople}人</View>
              <View className="progress">
                <AtProgress
                  percent={(order.hasPeople / order.totalPeople) * 100}
                  strokeWidth={6}
                  status="progress"
                  color="#FAD000"
                />
              </View>
              <View className="order-count">
                小计：￥{order.totalAmount}
                <Text className="sub-count">(共{order.count}份)</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="date">
        <View className="time">
          <View className="label">开始时间</View>
          <View className="value">2020年8月15日 15:20</View>
        </View>
        <View className="time">
          <View className="label">结束时间</View>
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
        </View>
      </View>
      {!order.payed && order.totalPeople <= order.hasPeople && (
        <View className="fulled">
          <View>当前人数已满，无法参与抢夺</View>
        </View>
      )}
      {order.payed && order.status === 2 && !order.winning && (
        <View className="failed">
          <View>很遗憾，未中奖</View>
        </View>
      )}
      {order.payed && order.status === 2 && order.winning && (
        <View className="success">
          <View className="left-2">
            <Image
              className="icon"
              src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/app-order/%E7%A4%BC%E7%89%A9%281%29%402x.png"
            />
            <View className="text">抢夺成功</View>
          </View>
          {order.used && (
            <View className="right-2">
              <View className="used-text">已领取</View>
            </View>
          )}
          {!order.used && (
            <View className="right-2">
              <View className="code-btn">查看兑换码</View>
            </View>
          )}
        </View>
      )}
    </View>
  )
}
