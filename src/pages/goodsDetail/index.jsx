import React, {useState, useEffect} from 'react'
import Taro, {useRouter, useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.scss'
import Footer from '@/components/footer'
import Timer from '@/components/timer'
import GoodsList from '@/components/goodsList'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import {createId} from '../../utils/idCreator'
import {getUserId} from '@/utils/common'
import DButton from '@/components/dButton'
import {useCurrentShopModel} from '@/models/currentShop'

export default function () {
  const router = useRouter()
  const {setShopId} = useCurrentShopModel((model) => [model.shop])

  const [detail, setDetail] = useState({})
  const [ended, setEnded] = useState(false)
  const params = router.params

  useEffect(() => {
    init()
  }, [params])

  const init = () => {
    if (params.goodsId && params.shopId) {
      setShopId(params.shopId)
      Taro.showLoading({title: '加载中'})
      commonHttpRequest('goods', 'get', {
        ownerId: params.shopId,
        id: params.goodsId,
      }).then((res) => {
        Taro.hideLoading()
        const goods = checkAndGetResult(res)
        if (goods) {
          setDetail(goods)
        }
      })
    } else {
      Taro.showToast({title: '参数异常', icon: 'none'})
    }
  }

  useEffect(() => {
    if (!detail.id) {
      return
    }
    if (detail.name) {
      // 设置页面title
      Taro.setNavigationBarTitle({title: detail.name})
    }
    console.log('getUserId()', getUserId())
  }, [detail])

  const placeOrder = () => {
    // 下单
    Taro.showLoading({title: '加载中'})
    const order = {
      id: createId(),
      ownerId: getUserId(),
      type: 0,
      name: detail.name,
      status: 1,
      winning: false,
      payed: false,
      used: false,
      goodsId: detail.id,
      count: 1,
      price: detail.price,
      shopId: params.shopId - 0,
      enabled: true,
    }
    commonHttpRequest(
      'order',
      'add',
      {ownerId: order.ownerId, id: order.id},
      {},
      order,
    ).then((res) => {
      Taro.hideLoading()
      const data = checkAndGetResult(res)
      if (data) {
        Taro.navigateTo({url: '/pages/orderDetail/index'})
      }
    })
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
        <GoodsList pageSize={10} hideId={[params.goodsId - 0]} />
      </View>
      <Footer />
      <View className="bottom-bar">
        <DButton
          openType="getUserInfo"
          onGetUserInfo={(isAuth) => {
            if (isAuth) {
              placeOrder()
            } else {
              Taro.showToast({
                title: '参与活动，需要您的授权',
                icon: 'none',
              })
            }
          }}
          content={<View className="btn-c">立即抢夺</View>}></DButton>
      </View>
    </View>
  )
}
