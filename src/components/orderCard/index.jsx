import React, {useState, useEffect} from 'react'
import {View, Image, Text, Button} from '@tarojs/components'
import {
  AtProgress,
  AtCountdown,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
} from 'taro-ui'
import './index.scss'
import {cardTagIcon} from '@/config'
import {QRCode} from 'taro-code'
import dayjs from 'dayjs'

export default function ({order}) {
  const [isOpened, setIsOpened] = useState(false)
  const [timer, setTimer] = useState(0)
  const [ended, setEnded] = useState(true)
  const [diffTime, setDiffTime] = useState({hours: 0, minutes: 0, seconds: 0})
  const title = order.type === 1 ? '福利单' : '抢夺单'
  const diffMillisecond = dayjs(order.endTime) - dayjs()
  useEffect(() => {
    console.log('eeeeeeee', diffMillisecond)
    if (timer) {
      clearInterval(timer)
    }
    const id = setInterval(() => {
      if (diffMillisecond > 0) {
        setEnded(false)
        setDiffTimeFunc()
      }
    }, 1000)
    setTimer(id)
  }, [diffMillisecond > 0])

  const setDiffTimeFunc = () => {
    const hours = Math.floor(diffMillisecond / 1000 / 60 / 60)
    const minutes = Math.floor((diffMillisecond / 1000 / 60) % 60)
    const seconds = Math.floor((diffMillisecond / 1000) % 60)
    setDiffTime({hours, minutes, seconds})
  }
  const openExchangeCode = () => {
    setIsOpened(true)
  }

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
          <View className="value">
            {dayjs(order.startTime).format('YYYY-MM-DD HH:mm:ss')}
          </View>
        </View>
        <View className="time">
          <View className="label">结束时间</View>
          {ended && (
            <View className="value">
              {dayjs(order.endTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          )}
          {!ended && (
            <View className="timer">
              <Image
                class="timer-icon"
                src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E7%BB%84%2018%402x.png"
              />
              <AtCountdown
                className="timer-main"
                isShowHour
                format={{hours: ':', minutes: ':', seconds: ''}}
                hours={diffTime.hours}
                minutes={diffTime.minutes}
                seconds={diffTime.seconds}
              />
            </View>
          )}
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
          {order.used > 0 && (
            <View className="right-2">
              <View className="used-text">已领取</View>
            </View>
          )}
          {!order.used && (
            <View className="right-2" onClick={() => openExchangeCode()}>
              <View className="code-btn">查看兑换码</View>
            </View>
          )}
        </View>
      )}
      <AtModal isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <AtModalHeader>兑换码</AtModalHeader>
        <AtModalContent>
          <View className="qrcode">
            <QRCode
              text={order.exchangeCode}
              size={160}
              scale={4}
              errorCorrectLevel="M"
              typeNumber={2}
            />
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setIsOpened(false)}>关闭</Button>
        </AtModalAction>
      </AtModal>
    </View>
  )
}
