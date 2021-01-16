import React, {useEffect, useState} from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import GoodsCard from '@/components/goodsCard'
import './index.scss'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import {useRouterParamModel} from '@/models/routerParam'

const tabList = [{title: '按人数'}, {title: '按金额'}]

export default function () {
  const {params = {}} = useRouterParamModel((model) => [model.params])
  const [currentTab, setCurrentTab] = useState(0)
  const [goodsList, setGoodsList] = useState([])

  const changeCondition = (index) => {
    setCurrentTab(index)
  }

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    console.log('paramsparamsparamsparams', params)
    commonHttpRequest(
      'goods',
      'getList',
      {ownerId: params.shopId},
      {index: 0, size: 20, running: 1},
    ).then((res) => {
      Taro.hideLoading()
      const list = checkAndGetResult(res)
      console.log('list', list)
      if (list) {
        setGoodsList(list)
      }
    })
  }

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
