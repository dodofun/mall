import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtForm, AtInput, AtButton} from 'taro-ui'
import './index.scss'
import {commonHttpRequest} from '@/utils/servers/utils'
import {useUserModel} from '@/models/user'
import {createId} from '../../utils/idCreator'
import {checkAndGetResult} from '../../utils/servers/utils'

const defaultFormData = {
  id: 0,
  ownerId: 0,
  name: '',
  ownerName: '',
  mobile: '',
  province: '',
  city: '',
  address: '',
  longitude: 0,
  latitude: 0,
  enabled: true,
}

export default function () {
  const userModel = useUserModel((model) => [model.getUser])

  const [formData, setFormData] = useState(defaultFormData)
  const [verificated, setVerificated] = useState(false)

  useEffect(() => {
    const varif = Object.keys(formData).every((item) => {
      if (Number.isNaN(item)) {
        return !!formData[item]
      } else {
        return true
      }
    })
    setVerificated(varif)
  }, [formData])

  useEffect(() => {
    const userInfo = userModel.getUser()
    setFormData({
      ...formData,
      ownerId: userInfo.id,
      ownerName: userInfo.name,
      mobile: userInfo.mobile || '',
    })
  }, [])

  const handleChange = (val, e) => {
    setFormData({...formData, [e.target.id]: val})
  }

  const submit = () => {
    const userInfo = userModel.getUser()
    const id = createId()
    formData.id = id
    if (verificated) {
      // 提交数据
      commonHttpRequest(
        'shop',
        'add',
        {ownerId: userInfo.id, id},
        {},
        formData,
      ).then((res) => {
        console.log('res', res)
        if (checkAndGetResult(res)) {
          // 跳转页面
          Taro.redirectTo({url: '/pages/reviewing/index'})
        }
      })
    }
  }

  useDidShow(() => {})

  useDidHide(() => {})

  useReady(() => {})

  return (
    <View className="join-us-form">
      <View className="form-card">
        <View className="form-title">入驻信息</View>
        <AtForm className="form-data">
          <AtInput
            name="name"
            title="店铺名称"
            type="text"
            placeholder="输入店铺名称"
            value={formData.name}
            required
            onChange={handleChange}
          />
          <AtInput
            name="ownerName"
            title="店主姓名"
            type="text"
            placeholder="输入店主名称"
            value={formData.ownerName}
            required
            onChange={handleChange}
          />
          <AtInput
            name="mobile"
            title="手机号码"
            type="phone"
            placeholder="输入手机号码"
            value={formData.mobile}
            required
            onChange={handleChange}
          />
        </AtForm>
      </View>
      <View className="form-card">
        <View className="form-title">地理信息</View>
        <AtForm className="form-data">
          <AtInput
            name="province"
            title="省份"
            type="text"
            placeholder="输入省份"
            value={formData.province}
            required
            onChange={handleChange}
          />
          <AtInput
            name="city"
            title="城市"
            type="text"
            placeholder="输入城市"
            value={formData.city}
            required
            onChange={handleChange}
          />
          <AtInput
            name="address"
            title="地址"
            type="text"
            placeholder="输入详细地址"
            value={formData.address}
            required
            onChange={handleChange}
          />
        </AtForm>
      </View>
      <View className="btn">
        <AtButton
          full
          disabled={!verificated}
          className="btn-join"
          onClick={submit}>
          申请入驻
        </AtButton>
      </View>
    </View>
  )
}
