import React, {useEffect, useState} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.scss'
import {AtCountdown, AtAvatar} from 'taro-ui'

export default function () {
  const [userList, setUserList] = useState([])
  useEffect(() => {
    setUserList([
      {
        id: 1,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 2,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 3,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 4,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 5,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 6,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 7,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 8,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 9,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 10,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 11,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
      {
        id: 12,
        avatar:
          'https://assets.yiduohoulang.com/images/mall/%E5%9B%BE%E5%B1%82%202%402x%20%286%29.png',
      },
    ])
  }, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="welfare">
      <View className="rule">活动规则</View>
      <View className="title">每天都等你来哦</View>
      <View className="head-img">
        <Image
          className="lucky-icon"
          src="https://assets.yiduohoulang.com/images/mall/welfare/%E7%BB%84%2025%402x.png"
        />
        <Image
          className="lucky-text"
          src="https://assets.yiduohoulang.com/images/mall/welfare/%E5%A4%BA%E5%8F%96%E7%A6%8F%E5%88%A9%402x.png"
        />
      </View>
      <View className="user-box">
        {userList.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                position: 'absolute',
                transform: `rotateZ(${index * 30}deg) translateY(240rpx)`,
              }}>
              <AtAvatar circle image={item.avatar}></AtAvatar>
            </View>
          )
        })}
        <View className="join-btn">
          <View className="join-inner">
            <View>立即</View>
            <View>参与</View>
          </View>
        </View>
        <View className="tip-text">仅有一位可以中奖哦</View>
      </View>
      <View className="timer-line">
        <AtCountdown
          isCard
          format={{day: '天', hours: '时', minutes: '分', seconds: '秒'}}
          hours={2}
          minutes={1}
          seconds={10}
          onTimeUp={() => {}}
        />
      </View>
      <View className="footer">
        <View className="text">
          本次活动为【无公害番茄2kg】，赶紧参与抢夺吧
        </View>
      </View>
    </View>
  )
}
