import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import {AtNoticebar, AtTabs, AtTabsPane} from 'taro-ui'
import {APP_CONSTANTS} from '@/config'
import './index.scss'
import Footer from '@/components/footer'
import GoodsCard from '@/components/goodsCard'
import DButton from '@/components/dButton'

const tipList = [
  {
    img: `${APP_CONSTANTS.ASSETS_IMAGE_HOST}/images/mall/%E7%BB%84%2016%402x.png`,
    label: '最快30分钟开奖',
  },
  {
    img: `${APP_CONSTANTS.ASSETS_IMAGE_HOST}/images/mall/%E6%8A%A2%402x.png`,
    label: '每天不限时抢夺',
  },
  {
    img: `${APP_CONSTANTS.ASSETS_IMAGE_HOST}/images/mall/%E4%BC%98%E6%83%A0%402x.png`,
    label: '超值划算',
  },
]

const tabList = [{title: '按人数'}, {title: '按金额'}]

export default function () {
  const [currentTab, setCurrentTab] = useState(0)
  const [goodsList, setGoodsList] = useState([])
  useEffect(() => {
    setGoodsList([
      {
        id: 1,
        name: '绿色冰糖西瓜3kg',
        totalPeople: 10,
        hasPeople: 8,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
        startTime: 1609596415948,
        endTime: 1609999179948,
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
        endTime: 1609999179948,
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
        endTime: 1609999179948,
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
        endTime: 1609999179948,
        price: 50,
      },
    ])
  }, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  const changeCondition = (index) => {
    setCurrentTab(index)
  }

  return (
    <View className="index">
      <View className="head">
        <DButton
          openType="getUserInfo"
          content={
            <Image
              className="head-image"
              src={`${APP_CONSTANTS.ASSETS_IMAGE_HOST}/images/mall/%E7%BB%84%2015%402x.png`}
            />
          }
          onGetUserInfo={(isAuth) => {
            if (isAuth) {
              Taro.navigateTo({url: '/pages/welfare/index'})
            } else {
              Taro.showToast({
                title: '参与活动，需要您的授权',
                icon: 'none',
              })
            }
          }}></DButton>
        <View className="tip-list">
          {tipList.map((item, index) => {
            return (
              <View key={index} className="tip-item">
                <Image className="img" src={item.img} />
                <Text className="label">{item.label}</Text>
              </View>
            )
          })}
        </View>
        <AtNoticebar icon="volume-plus">
          人数：10人、30人、40人；价格：1元、2元、5元。
        </AtNoticebar>
      </View>
      <AtTabs current={currentTab} tabList={tabList} onClick={changeCondition}>
        <AtTabsPane current={currentTab} index={0}>
          <View className="goods-list at-row at-row--wrap">
            {goodsList.map((item) => {
              return (
                <View key={item.id} className="goods-item at-col at-col-6">
                  <GoodsCard className="" goods={item} />
                </View>
              )
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <View className="goods-list at-row at-row--wrap">
            {goodsList.map((item) => {
              return (
                <View key={item.id} className="goods-item at-col at-col-6">
                  <GoodsCard className="" goods={item} />
                </View>
              )
            })}
          </View>
        </AtTabsPane>
      </AtTabs>
      <Footer />
    </View>
  )
}
