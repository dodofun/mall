import React, {useState, useEffect} from 'react'
import Taro, {
  useDidHide,
  useDidShow,
  useReady,
  useShareAppMessage,
} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import './index.scss'
import OrderCard from '@/components/bOrderCard'
import {commonHttpRequest} from '@/utils/servers/utils'
import {checkAndGetResult} from '../../utils/servers/utils'
import {useShopModel} from '@/models/shop'
import BWelfareCard from '@/components/bWelfareCard'
import {useShareModel} from '@/models/share'

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
  const [noData, setNoData] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)

  const {shareMsg} = useShareModel((model) => [model.shareMsg])
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return shareMsg
  })

  useEffect(() => {
    init()
  }, [currentTab])

  useEffect(() => {
    if (pageLoaded) {
      if (currentTab === 0) {
        setNoData(goodsList.length === 0)
      } else {
        setNoData(welfareList.length === 0)
      }
    }
  }, [pageLoaded])

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
        setPageLoaded(true)
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
        setPageLoaded(true)
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
                <BWelfareCard order={item} />
              </View>
            )
          })}
      </View>
      {noData && <View className="no-data">暂无数据</View>}
    </View>
  )
}
