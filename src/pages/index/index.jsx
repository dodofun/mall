import React from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import {AtNoticebar} from 'taro-ui'
import {APP_CONSTANTS} from '@/config'
import './index.scss'
import Footer from '@/components/footer'
import DButton from '@/components/dButton'
import GoodsList from '@/components/goodsList'

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

export default function () {
  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

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
      <GoodsList />
      <Footer />
    </View>
  )
}
