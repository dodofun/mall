import React, {useState} from 'react'
import {View, Image, Text} from '@tarojs/components'
import {AtProgress} from 'taro-ui'
import './index.scss'
import {cardTagIcon} from '@/config'
import Timer from '../timer'
import dayjs from 'dayjs'

export default function ({record}) {
  const [ended, setEnded] = useState(dayjs(record.endTime) - dayjs() < 0)
  const isFuli = record.type === 1

  return (
    <View className="income-card">
      <View className={isFuli ? 'title1' : 'title2'}>
        {isFuli ? '福利单' : '抢夺单'}
      </View>
      <View className="card">
        <View className="tag">
          <Image className="tag-icon" src={cardTagIcon[0]} />
          <View className="tag-info">{record.totalPeople}人抢</View>
        </View>
        <View className="main">
          <View className="left">
            <Image className="cover" src={record.cover} />
          </View>
          <View className="right">
            <View className="info">
              <View className="name">{record.goodsName}</View>
              <View className="num">参加人数：{record.hasPeople}人</View>
              <View className="progress">
                <AtProgress
                  percent={(record.hasPeople / record.totalPeople) * 100}
                  strokeWidth={4}
                  status="progress"
                  color="#FAD000"
                />
              </View>
              <View className="record-count">
                单价：{record.price}
                <Text className="sub-count">(共{record.hasPeople}份)</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="date">
        <View className="time">
          <View className="label">开始时间</View>
          <View className="value">
            {dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss')}
          </View>
        </View>
        <View className="time">
          <View className="label">结束时间</View>
          {ended && (
            <View className="value">
              {dayjs(record.endTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          )}
          {!ended && (
            <Timer
              className="timer"
              endTime={record.endTime}
              onSetEnded={(val) => {
                setEnded(val)
              }}
            />
          )}
        </View>
      </View>
      <View className="footer">
        <View className="income-text">
          此单收益:
          <View className="amount">
            ￥{Math.round(record.price * record.hasPeople * 100) / 100}
          </View>
        </View>
      </View>
    </View>
  )
}
