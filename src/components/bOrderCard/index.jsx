import React, {useState, useEffect} from 'react'
import {View, Image} from '@tarojs/components'
import {AtProgress} from 'taro-ui'
import './index.scss'
import {cardTagIcon} from '@/config'
import Timer from '../timer'
import dayjs from 'dayjs'
import CommonBtn from '../commonBtn'

export default function ({order, isFuli}) {
  const [ended, setEnded] = useState(dayjs(order.endTime) - dayjs() < 0)

  // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
  const [status, setStatus] = useState(0)

  useEffect(() => {
    if (order.startTime > dayjs().valueOf()) {
      setStatus(4)
    } else if (order.endTime > dayjs().valueOf()) {
      setStatus(1)
    } else if (order.endTime <= dayjs().valueOf()) {
      if (order.totalPeople <= order.hasPeople) {
        setStatus(2)
      } else {
        setStatus(3)
      }
    }
  }, [order])

  return (
    <View className="order-card">
      <View className={isFuli ? 'title1' : 'title2'}>
        {isFuli ? '福利单' : '抢夺单'}
      </View>
      <View className="card">
        <View className="tag">
          <Image className="tag-icon" src={cardTagIcon[0]} />
          <View className="tag-info">{order.totalPeople}人抢</View>
        </View>
        <View className="main">
          <View className="left">
            <Image className="cover" src={order.cover} lazyLoad />
          </View>
          <View className="right">
            <View className="info">
              <View className="name">{order.goodsName}</View>
              <View className="num">参加人数：{order.hasPeople || 0}人</View>
              <View className="progress">
                <AtProgress
                  percent={
                    Math.round(
                      ((order.hasPeople || 0) / order.totalPeople) * 100 * 100,
                    ) / 100
                  }
                  strokeWidth={4}
                  status="progress"
                  color="#FAD000"
                />
              </View>
              <View className="order-count">价格：￥{order.price}</View>
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
        {status !== 4 && (
          <View className="time">
            <View className="label">结束时间</View>
            {ended && (
              <View className="value">
                {dayjs(order.endTime).format('YYYY-MM-DD HH:mm:ss')}
              </View>
            )}
            {!ended && (
              <Timer
                className="timer"
                endTime={order.endTime}
                onSetEnded={(val) => {
                  setEnded(val)
                }}
              />
            )}
          </View>
        )}
        {status === 4 && (
          <View className="time">
            <View className="label">距上架时间</View>
            <Timer className="timer" endTime={order.startTime} />
          </View>
        )}
      </View>
      {status === 1 && (
        <View className="doing">
          <CommonBtn text="立即分享" onClick={() => {}} />
        </View>
      )}
      {status === 2 && (
        <View className="doing">
          <View className="income-text">
            此单收益:
            <View className="amount">￥{order.totalPeople * order.price}</View>
          </View>
          <CommonBtn text="再推一单" onClick={() => {}} />
        </View>
      )}
      {status === 3 && (
        <View className="failed">
          <View>因人数不全，抢夺未生效</View>
        </View>
      )}
      {false && status === 4 && (
        <View className="pending">
          <View className="action">
            <Image
              className="icon"
              src="https://assets.yiduohoulang.com/images/mall/%E7%BC%96%20%E8%BE%91%402x.png"
            />
            <View className="txt">编辑</View>
          </View>
          <View className="action">
            <Image
              className="icon"
              src="https://assets.yiduohoulang.com/images/mall/%E4%B8%8B%E6%9E%B6%402x.png"
            />
            <View className="txt">下架</View>
          </View>
        </View>
      )}
    </View>
  )
}
