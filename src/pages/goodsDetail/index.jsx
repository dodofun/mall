import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.scss'
import Footer from '@/components/footer'
import Timer from '@/components/timer'
import GoodsCard from '@/components/goodsCard'
import {AtButton} from 'taro-ui'

export default function () {
  const [detail, setDetail] = useState({})
  const [goodsList, setGoodsList] = useState([])
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    // 获取详情
    setDetail({
      id: 1,
      name: '绿色冰糖西瓜3kg',
      price: 10.5,
      totalPeople: 10,
      hasPeople: 8,
      cover:
        'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
      startTime: 1609596415948,
      endTime: 1609899179948,
    })
    setGoodsList([
      {
        id: 1,
        name: '绿色冰糖西瓜3kg',
        totalPeople: 10,
        hasPeople: 8,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
        startTime: 1609596415948,
        endTime: 1609699179948,
        price: 10.5,
      },
      {
        id: 2,
        name: '新到番茄2kg',
        totalPeople: 10,
        hasPeople: 4,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xihongshi.png',
        startTime: 1609596415948,
        endTime: 1609699179948,
        price: 12,
      },
      {
        id: 3,
        name: '东北大米25kg',
        totalPeople: 20,
        hasPeople: 20,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xiaomai.png',
        startTime: 1609596415948,
        endTime: 1609699179948,
        price: 10.5,
      },
      {
        id: 4,
        name: '金龙鱼调和油5kg',
        totalPeople: 50,
        hasPeople: 32,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-you.png',
        startTime: 1609596415948,
        endTime: 1609699179948,
        price: 50,
      },
    ])
  }, [])

  useEffect(() => {
    if (!detail.id) {
      return
    }
    if (detail.name) {
      // 设置页面title
      Taro.setNavigationBarTitle({title: detail.name})
    }
  }, [detail])

  const placeOrder = () => {
    // 下单
    Taro.navigateTo({url: '/pages/orderDetail/index'})
  }

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="goods-detail">
      <View className="head">
        <Image className="cover" src={detail.cover} />
      </View>
      <View className="info">
        <View className="left">
          <View className="price">￥{detail.price}</View>
          <View className="name">{detail.name}</View>
        </View>
        <View className="right">
          <View className="label">距离抢夺结束还剩</View>
          {!ended && (
            <Timer
              className="timer"
              endTime={detail.endTime}
              onSetEnded={(val) => {
                setEnded(val)
              }}
            />
          )}
        </View>
      </View>
      <View className="rules">
        <View className="rule">
          <View className="label-left">优惠券</View>
          <View className="label-right">抢夺失败可以领对应金额的优惠券</View>
        </View>
        <View className="rule">
          <View className="label-left">活动规则</View>
          <View className="label-right">
            抢夺结束只有一名幸运宠儿，失败者可领取优惠券
          </View>
        </View>
        <View className="rule">
          <View className="label-left">领取方式</View>
          <View className="label-right">
            抢夺成功者可凭订单里的兑奖码到店兑换商品
          </View>
        </View>
      </View>
      <View className="recommend">
        <View className="title">推荐活动</View>
        <View className="goods-list at-row at-row--wrap">
          {goodsList.map((item) => {
            return (
              <View key={item.id} className="goods-item at-col at-col-6">
                <GoodsCard className="" goods={item} />
              </View>
            )
          })}
        </View>
      </View>
      <Footer />
      <View className="bottom-bar">
        <AtButton
          className="btn"
          onClick={() => {
            placeOrder()
          }}>
          立即抢夺
        </AtButton>
      </View>
    </View>
  )
}
