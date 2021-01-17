import React, {useState, useEffect} from 'react'
import Taro from '@tarojs/taro'
import {View, Image, Text, Button} from '@tarojs/components'
import {
  AtProgress,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
} from 'taro-ui'
import './index.scss'
import {cardTagIcon} from '@/config'
import {QRCode} from 'taro-code'
import Timer from '../timer'
import dayjs from 'dayjs'
import {toPayOrder} from '../../action/order'
import {useUserModel} from '@/models/user'
import {useOrderModel} from '@/models/order'

export default function ({order, isBuss}) {
  const goods = order.goods || {}

  const {user} = useUserModel((model) => [model.user])
  const [isOpened, setIsOpened] = useState(false)
  const [payed, setPayed] = useState(order.payed)
  const [ended, setEnded] = useState(dayjs(goods.endTime) - dayjs() < 0)

  const [status, setStatus] = useState(0)

  useEffect(() => {
    if (ended) {
      setStatus(goods.hasPeople === goods.totalPeople ? 2 : 3)
    } else {
      setStatus(1)
    }
  }, [ended])

  const isFuli = order.type === 1

  const {setRefreshTime} = useOrderModel((model) => [model.setRefreshTime])

  const openExchangeCode = () => {
    setIsOpened(true)
  }

  const toPay = async () => {
    const res = await toPayOrder({userId: user.id, orderId: order.id})
    if (res) {
      // 参数调整
      res.package = res.packageValue
      Taro.requestPayment(res).then((payRes) => {
        if (payRes.errMsg.indexOf('ok') >= 0) {
          setPayed(true)
          setRefreshTime(new Date().getTime())
          // 支付成功
          Taro.navigateTo({url: '/pages/paySuccess/index'})
        } else {
          // 未支付成功
          Taro.showToast({title: '请继续完成支付哦', icon: 'none'})
        }
      })
    } else {
      Taro.showToast({title: '支付异常，请稍后重试', icon: 'none'})
    }
  }

  return (
    <View className="order-card">
      <View className={isFuli ? 'title1' : 'title2'}>
        {isFuli ? '福利单' : '抢夺单'}
      </View>
      <View className="card">
        <View className="tag">
          <Image className="tag-icon" src={cardTagIcon[0]} />
          <View className="tag-info">{goods.totalPeople}人抢</View>
        </View>
        <View className="main">
          <View className="left">
            <Image className="cover" src={goods.cover} lazyLoad />
          </View>
          <View className="right">
            <View className="info">
              <View className="name">{goods.name}</View>
              <View className="num">参加人数：{goods.hasPeople || 0}人</View>
              <View className="progress">
                <AtProgress
                  percent={Math.round(
                    ((goods.hasPeople || 0) / goods.totalPeople) * 100,
                  )}
                  strokeWidth={4}
                  status="progress"
                  color="#FAD000"
                />
              </View>
              <View className="order-count">
                小计：￥{order.count * order.price}
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
            {dayjs(goods.startTime).format('YYYY-MM-DD HH:mm:ss')}
          </View>
        </View>
        <View className="time">
          <View className="label">结束时间</View>
          {ended && (
            <View className="value">
              {dayjs(goods.endTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          )}
          {!ended && (
            <Timer
              className="timer"
              endTime={goods.endTime}
              onSetEnded={(val) => {
                setEnded(val)
              }}
            />
          )}
        </View>
      </View>
      {status === 1 && !payed && !isBuss && (
        <View className="doing">
          <View className="left-1">
            <Image
              className="wexinpay-icon"
              src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/app-order/%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98%402x.png"
            />
            <View className="wexinpay-text">微信支付</View>
          </View>
          <View className="right-1">
            <AtButton type="secondary" size="small" onClick={toPay}>
              立即支付
            </AtButton>
          </View>
        </View>
      )}
      {status === 3 && payed && !isBuss && (
        <View className="closed">退款会在3个工作日内返还</View>
      )}
      {status === 3 && !payed && (
        <View className="fulled">
          <View>活动未生效，订单已关闭</View>
        </View>
      )}
      {!payed && goods.totalPeople <= goods.hasPeople && (
        <View className="fulled">
          <View>当前人数已满，无法参与抢夺</View>
        </View>
      )}
      {payed && status === 2 && !order.winning && (
        <View className="failed">
          <View>很遗憾，您未中奖</View>
        </View>
      )}
      {payed && status === 2 && order.winning && (
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
          {!order.used && isBuss && (
            <View className="right-2">
              <View className="used-text">待使用</View>
            </View>
          )}
          {!order.used && !isBuss && (
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
              text={'writeOff:order:' + order.ownerId + ',' + order.id}
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
