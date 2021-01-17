import React, {useEffect, useState} from 'react'
import Taro, {useRouter, useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import WriteOffCard from '@/components/writeOffCard'
import './index.scss'
import {AtButton} from 'taro-ui'
import {commonHttpRequest} from '@/utils/servers/utils'
import {checkAndGetResult} from '../../utils/servers/utils'

export default function () {
  const router = useRouter()
  const params = router.params
  const [waitData, setWaitData] = useState()
  const [isOrder, setIsOrder] = useState(false)

  useEffect(() => {
    if (params.ownerId && params.orderId) {
      setIsOrder(true)
      writeOffOrder()
    }
  }, [params.ownerId, params.orderId])

  const writeOffOrder = () => {
    commonHttpRequest('order', 'get', {
      ownerId: params.ownerId,
      id: params.orderId,
    }).then((res) => {
      const data = checkAndGetResult(res)
      if (data) {
        setWaitData({type: 1, value: data})
      } else {
        setWaitData()
      }
    })
  }

  const submit = () => {
    if (isOrder) {
      commonHttpRequest(
        'order',
        'update',
        {
          ownerId: params.ownerId - 0,
          id: params.orderId - 0,
        },
        {prop: 'used'},
        {used: true},
      ).then((res) => {
        const data = checkAndGetResult(res)
        if (data) {
          Taro.showToast({title: '成功核销'})
          setTimeout(() => {
            Taro.navigateBack()
          }, 600)
        }
      })
    }
  }

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="b-writeoff-record">
      <View className="list">
        {waitData && <WriteOffCard data={waitData} />}
      </View>
      {waitData && (
        <View className="bottom-bar">
          <AtButton
            className="b-writeoff-btn"
            disabled={waitData.value.used}
            onClick={submit}>
            立即核销
          </AtButton>
        </View>
      )}
    </View>
  )
}
