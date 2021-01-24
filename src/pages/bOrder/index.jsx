import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import './index.scss'
import OrderCard from '@/components/bOrderCard'
import {commonHttpRequest} from '@/utils/servers/utils'
import {checkAndGetResult} from '../../utils/servers/utils'
import {useShopModel} from '@/models/shop'

const tabList = [{title: '抢夺单'}, {title: '福利单'}]

export default function () {
  const pageSize = 20
  const [goodsPageIndex] = useState(0)
  const [welfarePageIndex] = useState(0)
  const [currentTab, setCurrentTab] = useState(0)
  const [openLoading, setOpenLoading] = useState(false)
  const {shop} = useShopModel((model) => [model.shop])

  const [goodsList, setGoodsList] = useState([])
  const [welfareList, setWelfareList] = useState([])

  useEffect(() => {
    // setOrderList([
    //   {
    //     id: 2,
    //     type: 0, // 0: 抢夺单，1: 福利单
    //     status: 4, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
    //     totalPeople: 10,
    //     hasPeople: 8,
    //     goodsId: 1,
    //     goodsName: '绿色冰糖西瓜3kg',
    //     cover:
    //       'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
    //     count: 3,
    //     price: 8,
    //     totalAmount: 24,
    //     startTime: 1610696495948,
    //     endTime: 1610699495948,
    //     exchangeCode: 'demo',
    //   },
    //   {
    //     id: 4,
    //     type: 0, // 0: 抢夺单，1: 福利单
    //     status: 1, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
    //     totalPeople: 10,
    //     hasPeople: 8,
    //     goodsId: 1,
    //     goodsName: '绿色冰糖西瓜3kg',
    //     cover:
    //       'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
    //     count: 3,
    //     price: 8,
    //     totalAmount: 24,
    //     startTime: 1609596415948,
    //     endTime: 1610696495948,
    //     exchangeCode: 'demo',
    //   },
    //   {
    //     id: 5,
    //     type: 0, // 0: 抢夺单，1: 福利单
    //     status: 2, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
    //     totalPeople: 10,
    //     hasPeople: 8,
    //     goodsId: 1,
    //     goodsName: '绿色冰糖西瓜3kg',
    //     cover:
    //       'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
    //     count: 3,
    //     price: 8,
    //     totalAmount: 24,
    //     startTime: 1609596415948,
    //     endTime: 1610696495948,
    //     exchangeCode: 'demo',
    //   },
    //   {
    //     id: 1,
    //     type: 0, // 0: 抢夺单，1: 福利单
    //     status: 3, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
    //     totalPeople: 10,
    //     hasPeople: 8,
    //     goodsId: 1,
    //     goodsName: '绿色冰糖西瓜3kg',
    //     cover:
    //       'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
    //     count: 3,
    //     price: 8,
    //     totalAmount: 24,
    //     startTime: 1609596415948,
    //     endTime: 1610696495948,
    //     exchangeCode: 'demo',
    //   },
    //   {
    //     id: 1,
    //     type: 1, // 0: 抢夺单，1: 福利单
    //     status: 1, // 1: 进行中；2: 已开奖；3: 未生效；4: 未开始；0: 全部
    //     totalPeople: 10,
    //     hasPeople: 10,
    //     goodsId: 1,
    //     goodsName: '绿色冰糖西瓜3kg',
    //     cover:
    //       'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E7%BB%84%2015%402x.png',
    //     count: 3,
    //     price: 8,
    //     totalAmount: 24,
    //     startTime: 1609596415948,
    //     endTime: 1609599455948,
    //   },
    // ])

    init()
  }, [currentTab])

  const init = () => {
    if (!shop || !shop.id) {
      return
    }
    setOpenLoading(true)
    if (currentTab === 0) {
      commonHttpRequest(
        'goods',
        'getList',
        {ownerId: shop.id},
        {index: goodsPageIndex, size: pageSize},
      ).then((res) => {
        setOpenLoading(false)
        const list = checkAndGetResult(res)
        if (list) {
          setGoodsList(list)
        } else {
          setGoodsList([])
        }
      })
    } else if (currentTab === 1) {
      commonHttpRequest(
        'welfare',
        'getList',
        {
          ownerId: shop.id,
        },
        {index: welfarePageIndex, size: pageSize},
      ).then((res) => {
        setOpenLoading(false)
        const list = checkAndGetResult(res)
        if (list) {
          setWelfareList(list)
        } else {
          setWelfareList([])
        }
      })
    }
  }

  useEffect(() => {
    if (openLoading) {
      Taro.showLoading({title: '加载中'})
    } else {
      Taro.hideLoading()
    }
  }, [openLoading])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  const changeCondition = (index) => {
    setCurrentTab(index)
  }

  return (
    <View className="order">
      <AtTabs
        className="tabs"
        scroll
        current={currentTab}
        tabList={tabList}
        onClick={changeCondition}
      />
      <View className="order-list">
        <View className="offset"></View>
        {currentTab === 0 &&
          goodsList.map((item) => {
            return (
              <View key={item.id} className="order-item">
                <OrderCard order={item} />
              </View>
            )
          })}
        {currentTab === 1 &&
          welfareList.map((item) => {
            return (
              <View key={item.id} className="order-item">
                <OrderCard order={item} isFuli />
              </View>
            )
          })}
      </View>
    </View>
  )
}
