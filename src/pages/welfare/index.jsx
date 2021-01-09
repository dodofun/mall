import React, {useEffect, useState} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image, Button} from '@tarojs/components'
import './index.scss'
import {
  AtCountdown,
  AtAvatar,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
} from 'taro-ui'

export default function () {
  const [joinBoxShow, setJoinBoxShow] = useState(false)
  const [joinStatusText, setJoinStatusText] = useState('立即参与')
  const [ruleShow, setRuleShow] = useState(false)
  const [goods, setGoods] = useState({})
  const [userList, setUserList] = useState([])
  useEffect(() => {
    // 判断：1.是否参与过，2.活动是否正在进行，3.是否人数已满，4.如果参与过，是否成功
    // 没参与过活动，则弹窗
    setJoinBoxShow(true)
    setGoods({
      id: 1,
      name: '无公害番茄3kg',
    })
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

  const join = () => {
    Taro.showToast({title: '参与成功', icon: 'none'})
    setJoinStatusText('参与成功')
  }

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="welfare">
      <View
        className="rule"
        onClick={() => {
          setRuleShow(true)
        }}>
        活动规则
      </View>
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
      <View className="footer">
        <View className="text">本次活动奖品为【{goods.name}】，赶紧参与吧</View>
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
        <View className="join-btn" onClick={() => join()}>
          <View className="join-inner">
            <View>{joinStatusText}</View>
          </View>
        </View>
        <View className="tip-text">仅有一位可以中奖哦</View>
      </View>

      <AtModal
        isOpened={ruleShow}
        onClose={() => setRuleShow(false)}
        className="rule-modal">
        <AtModalHeader>活动规则</AtModalHeader>
        <AtModalContent className="content">
          <View className="rule-item">
            1.本活动为0元免费参加，人满后2分钟开奖
          </View>
          <View className="rule-item">2.每个人中奖几率一样</View>
          <View className="rule-item">3.中奖商品以商品描述为准</View>
          <View className="rule-item">
            4.活动随机选出一位中奖者，可凭订单内兑换码到店兑换商品
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setRuleShow(false)}>关闭</Button>
        </AtModalAction>
      </AtModal>
      {joinBoxShow && (
        <View className="modal-box">
          <View className="bg-view">
            <View className="title">
              <View>【{goods.name}】</View>
              <View>赶紧参与抢夺吧</View>
            </View>
            <View className="action-btn" onClick={() => setJoinBoxShow(false)}>
              我要参与
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
