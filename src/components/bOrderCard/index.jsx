import React, {useState} from 'react'
import {View, Image} from '@tarojs/components'
import {AtProgress} from 'taro-ui'
import './index.scss'
import {cardTagIcon} from '@/config'
import Timer from '../timer'
import dayjs from 'dayjs'
import CommonBtn from '../commonBtn'

export default function ({order}) {
  const [ended, setEnded] = useState(dayjs(order.endTime) - dayjs() < 0)
  const isFuli = order.type === 1

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
              <View className="num">参加人数：{order.hasPeople}人</View>
              <View className="progress">
                <AtProgress
                  percent={(order.hasPeople / order.totalPeople) * 100}
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
        {order.status !== 4 && (
          <View className="time">
            <View className="label">开始时间</View>
            <View className="value">
              {dayjs(order.startTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          </View>
        )}
        <View className="time">
          <View className="label">结束时间</View>
          {(ended || order.status === 4) && (
            <View className="value">
              {dayjs(order.endTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          )}
          {!ended && order.status !== 4 && (
            <Timer
              className="timer"
              endTime={order.endTime}
              onSetEnded={(val) => {
                setEnded(val)
              }}
            />
          )}
        </View>
        {order.status === 4 && (
          <View className="time">
            <View className="label">距上架时间</View>
            <Timer className="timer" endTime={order.startTime} />
          </View>
        )}
      </View>
      {order.status === 1 && (
        <View className="doing">
          <CommonBtn text="立即分享" onClick={() => {}} />
        </View>
      )}
      {order.status === 2 && (
        <View className="doing">
          <View className="income-text">
            此单收益:
            <View className="amount">￥{order.count * order.price}</View>
          </View>
          <CommonBtn text="再推一单" onClick={() => {}} />
        </View>
      )}
      {order.status === 3 && (
        <View className="failed">
          <View>因人数不全，抢夺未生效</View>
        </View>
      )}
      {order.status === 4 && (
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
