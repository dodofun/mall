import React, {useEffect, useState} from 'react'
import {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import IncomeCard from '@/components/incomeCard'
import './index.scss'
import {getSuccessGoodsList} from '../../action/order'
import {useShopModel} from '@/models/shop'

export default function () {
  const {shop} = useShopModel((model) => [model.shop])
  const [list, setList] = useState([])

  useEffect(() => {
    init()
  }, [shop])

  const init = () => {
    if (shop.id) {
      getSuccessGoodsList(shop.id).then((res) => {
        setList(res)
      })
    }
  }

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="b-income-record">
      <View className="list">
        {list.map((item) => {
          return <IncomeCard key={item.id} record={item} />
        })}
      </View>
    </View>
  )
}
