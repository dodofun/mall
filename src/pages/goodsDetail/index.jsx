import React, {useState, useEffect} from 'react'
import Taro, {
  useRouter,
  useDidHide,
  useDidShow,
  useReady,
  useShareAppMessage,
} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.scss'
import Footer from '@/components/footer'
import Timer from '@/components/timer'
import GoodsList from '@/components/goodsList'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import {createId} from '../../utils/idCreator'
import {getUserId} from '@/utils/common'
import DButton from '@/components/dButton'
import {useOrderModel} from '@/models/order'
import {useShareModel} from '@/models/share'

export default function () {
  const router = useRouter()
  const {setRefreshTime} = useOrderModel((model) => [model.setRefreshTime])
  const [detail, setDetail] = useState({})
  const [ended, setEnded] = useState(false)
  const params = router.params

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
  }, [params])

  const init = () => {
    if (params.goodsId && params.shopId) {
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
      goods: detail,
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
        setRefreshTime(new Date().getTime())
        Taro.navigateTo({
          url: `/pages/orderDetail/index?userId=${order.ownerId}&orderId=${order.id}`,
        })
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
              type="white"
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
          <View className="label-right">
            抢夺失败也可以领到
            <View className="coupon-amount">【{detail.couponAmount}元】</View>
            优惠券
          </View>
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
