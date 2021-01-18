import React, {useEffect, useState} from 'react'
import Taro, {useRouter, useDidHide, useDidShow, useReady} from '@tarojs/taro'
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
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import dayjs from 'dayjs'
import {useUserModel} from '@/models/user'

export default function () {
  const router = useRouter()
  const params = router.params
  const [joinBoxShow, setJoinBoxShow] = useState(false)
  const [joinStatusText, setJoinStatusText] = useState('立即参与')
  const [ruleShow, setRuleShow] = useState(false)
  const [userList, setUserList] = useState([])
  const [welfare, setWelfare] = useState({})
  const {user} = useUserModel((model) => [model.user])

  const [diffMillisecond, setDiffMillisecond] = useState(0)
  const [diffTime, setDiffTime] = useState({hours: 0, minutes: 0, seconds: 0})

  useEffect(() => {
    if (params.shopId > 0) {
      init()
    }
  }, [params.shopId])

  const init = () => {
    commonHttpRequest(
      'welfare',
      'getList',
      {
        ownerId: params.shopId,
      },
      {index: 0, size: 1},
    ).then((res) => {
      const data = checkAndGetResult(res)
      console.log('data', data)
      if (data && data.length > 0) {
        setWelfare(data[0])
      }
    })
  }

  useEffect(() => {
    if (welfare.id) {
      console.log('welfare', welfare)
      const defaultUserList = new Array(10)
      defaultUserList.fill({}, 0, welfare.personNum)
      setUserList(defaultUserList)
    }
  }, [welfare])

  useEffect(() => {
    if (welfare.endTime) {
      setDiffMillisecond(dayjs(welfare.endTime) - dayjs())
    }
  }, [welfare.endTime])

  useEffect(() => {
    if (diffMillisecond > 0) {
      setDiffTimeFunc()
    }
  }, [diffMillisecond])

  const setDiffTimeFunc = () => {
    const hours = Math.floor(diffMillisecond / 1000 / 60 / 60)
    const minutes = Math.floor((diffMillisecond / 1000 / 60) % 60)
    const seconds = Math.floor((diffMillisecond / 1000) % 60)
    setDiffTime({hours, minutes, seconds})
  }

  useEffect(() => {
    // 判断：1.是否参与过，2.活动是否正在进行，3.是否人数已满，4.如果参与过，是否成功
    // 没参与过活动，则弹窗
    setJoinBoxShow(true)
  }, [])

  const join = () => {
    // 组装数据
    const data = {...welfare}
    data.hasPersonNum = (data.hasPersonNum || 0) + 1

    commonHttpRequest(
      'welfare',
      'update',
      {
        ownerId: welfare.ownerId,
        id: welfare.id,
      },
      {join: true},
      user,
    ).then((res) => {
      const r = checkAndGetResult(res)
      if (r) {
        Taro.showToast({title: '参与成功', icon: 'none'})
        setJoinStatusText('参与成功')
      }
    })
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
        <View className="text">
          本次活动奖品为【{welfare.name}】，赶紧参与吧
        </View>
      </View>
      <View className="timer-line">
        <AtCountdown
          isCard
          format={{day: '天', hours: '时', minutes: '分', seconds: '秒'}}
          hours={diffTime.hours}
          minutes={diffTime.minutes}
          seconds={diffTime.seconds}
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
                transform: `rotateZ(${
                  (index * 360) / userList.length
                }deg) translateY(240rpx)`,
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
              <View>【{welfare.name}】</View>
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
