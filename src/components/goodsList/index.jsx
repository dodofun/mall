import React, {useEffect, useState} from 'react'
import {View} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import GoodsCard from '@/components/goodsCard'
import './index.scss'

const tabList = [{title: '按人数'}, {title: '按金额'}]

export default function () {
  const [currentTab, setCurrentTab] = useState(0)
  const [goodsList, setGoodsList] = useState([])

  const changeCondition = (index) => {
    setCurrentTab(index)
  }

  useEffect(() => {
    setGoodsList([
      {
        id: 1,
        name: '绿色冰糖西瓜3kg',
        totalPeople: 10,
        hasPeople: 8,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xigua.png',
        startTime: 1609596415948,
        endTime: 1609999179948,
        price: 10.5,
      },
      {
        id: 2,
        name: '新到番茄2kg',
        totalPeople: 10,
        hasPeople: 4,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xihongshi.png',
        startTime: 1609596415948,
        endTime: 1609999179948,
        price: 12,
      },
      {
        id: 3,
        name: '东北大米25kg',
        totalPeople: 20,
        hasPeople: 20,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-xiaomai.png',
        startTime: 1609596415948,
        endTime: 1609999179948,
        price: 10.5,
      },
      {
        id: 4,
        name: '金龙鱼调和油5kg',
        totalPeople: 50,
        hasPeople: 32,
        cover:
          'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/goods/goods-you.png',
        startTime: 1609596415948,
        endTime: 1609999179948,
        price: 50,
      },
    ])
  }, [])

  return (
    <View className="goods-list-card">
      {false && (
        <AtTabs
          current={currentTab}
          tabList={tabList}
          onClick={changeCondition}></AtTabs>
      )}
      <View className="goods-list at-row at-row--wrap">
        {goodsList.map((item) => {
          return (
            <View key={item.id} className="goods-item at-col at-col-6">
              <GoodsCard className="" goods={item} />
            </View>
          )
        })}
      </View>
    </View>
  )
}
