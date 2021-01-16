import React, {useEffect, useState} from 'react'
import {useRouter} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import GoodsCard from '@/components/goodsCard'
import './index.scss'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'

const tabList = [{title: '按人数'}, {title: '按金额'}]

export default function ({pageSize = 20, hideId = []}) {
  const router = useRouter()
  const params = router.params
  const [currentTab, setCurrentTab] = useState(0)
  const [goodsList, setGoodsList] = useState([])
  const [pageIndex] = useState(0)

  const changeCondition = (index) => {
    setCurrentTab(index)
  }

  useEffect(() => {
    init()
  }, [params])

  const init = () => {
    commonHttpRequest(
      'goods',
      'getList',
      {ownerId: params.shopId},
      {index: pageIndex, size: pageSize, running: 1},
    ).then((res) => {
      const list = checkAndGetResult(res)
      if (list) {
        const filterData = list.filter((item) => !hideId.includes(item.id))
        setGoodsList(filterData)
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
