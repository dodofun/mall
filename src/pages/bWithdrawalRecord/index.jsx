import React, {useEffect, useState} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import dayjs from 'dayjs'
import './index.scss'
import {commonHttpRequest} from '@/utils/servers/utils'
import {useShopModel} from '@/models/shop'
import {checkAndGetResult} from '../../utils/servers/utils'

export default function () {
  const pageSize = 20
  const [pageIndex, setPageIndex] = useState(0)

  const {shop} = useShopModel((model) => [model.shop])
  const [list, setList] = useState([])
  useEffect(() => {
    setPageIndex(0)
    init()
  }, [shop])

  const init = () => {
    commonHttpRequest(
      'withdrawalRecord',
      'getList',
      {ownerId: shop.id},
      {index: pageIndex, size: pageSize},
    ).then((res) => {
      const resList = checkAndGetResult(res)
      if (resList) {
        console.log('resList', resList)
        setList(resList)
      } else {
        setList([])
      }
    })
  }

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="b-withdrawal-record">
      <View className="list">
        {list.map((item) => {
          return (
            <View className="record" key={item.id}>
              <View className="left">
                <View className="name">{item.name}</View>
                <View className="time">
                  {dayjs(item.createAt).format('YYYY-MM-DD HH:mm')}
                </View>
              </View>
              <View className="right">+￥{item.amount}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
