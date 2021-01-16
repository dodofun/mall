import React from 'react'
import Taro from '@tarojs/taro'
import {authUserInfoWx} from '@/action'
import {AtButton} from 'taro-ui'
import './index.scss'

export default function (props) {
  const content = props.content
  props.content = undefined

  // 根据 openType 绑定不同的点击事件

  return (
    <AtButton
      className="btn"
      type="secondary"
      {...props}
      onClick={() => {
        props.onClick && props.onClick()
      }}
      onGetUserInfo={async (e) => {
        const isAuth = e.detail.errMsg.indexOf('ok') > -1
        if (isAuth) {
          // 根据 event 信息，获取用户信息
          const userInfo = await authUserInfoWx(e, 'userinfo')
          if (userInfo) {
            Taro.setStorageSync('userInfo', {
              ...userInfo,
              ...(e.detail.userInfo || {}),
            })
          } else {
            // 获取信息失败
            const localUserInfo = Taro.getStorageSync('userInfo') || {}
            Taro.setStorageSync('userInfo', {
              ...localUserInfo,
              ...(e.detail.userInfo || {}),
            })
          }
        }
        // 回调
        props.onGetUserInfo && props.onGetUserInfo(isAuth, e)
      }}
      onGetPhoneNumber={async (e) => {
        const isAuth = e.detail.errMsg.indexOf('ok') > -1
        if (isAuth) {
          // 根据 event 信息，获取用户信息
          const userInfo = await authUserInfoWx(e, 'mobile')
          if (userInfo) {
            Taro.setStorageSync('userInfo', {
              ...userInfo,
              ...(e.detail.userInfo || {}),
            })
          } else {
            // 获取信息失败
            const localUserInfo = Taro.getStorageSync('userInfo') || {}
            Taro.setStorageSync('userInfo', {
              ...localUserInfo,
              ...(e.detail.userInfo || {}),
            })
          }
        }
        // 回调
        props.onGetPhoneNumber && props.onGetPhoneNumber(isAuth, e)
      }}
      onError={() => {}}
      onOpenSetting={() => {}}
      onContact={() => {}}>
      {content}
    </AtButton>
  )
}