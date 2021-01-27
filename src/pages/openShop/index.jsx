import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import './index.scss'
import {checkAndGetResult, commonHttpRequest} from '@/utils/servers/utils'
import {useUserModel} from '@/models/user'

export default function () {
  const [btnTxt, setBtnTxt] = useState('申请入驻')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const userModel = useUserModel((model) => [model.user])

  useEffect(() => {
    const userInfo = userModel.user
    commonHttpRequest(
      'shop',
      'getList',
      {ownerId: userInfo.id},
      {size: 1},
    ).then((res) => {
      const list = checkAndGetResult(res)
      if (list && list.length > 0) {
        setBtnTxt('您已入驻')
        setBtnDisabled(true)
      }
    })
  }, [])

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="join-us">
      <Image
        className="icon"
        src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/jiameng.png"
      />
      <View className="join-us-btn">
        <AtButton
          full
          disabled={btnDisabled}
          className="btn-join"
          onClick={() => {
            // 申请入驻
            Taro.navigateTo({url: '/pages/joinUsForm/index'})
          }}>
          {btnTxt}
        </AtButton>
      </View>
    </View>
  )
}
