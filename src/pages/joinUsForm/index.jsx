import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtForm, AtInput, AtButton} from 'taro-ui'
import './index.scss'

const defaultFormData = {
  shopName: '',
  ownerName: '',
  mobile: '',
  province: '',
  city: '',
  address: '',
}

export default function () {
  const [formData, setFormData] = useState(defaultFormData)
  const [verificated, setVerificated] = useState(false)

  useEffect(() => {
    const varif = Object.keys(formData).every((item) => !!formData[item])
    setVerificated(varif)
  }, [formData])

  const handleChange = (val, e) => {
    setFormData({...formData, [e.target.id]: val})
  }

  const submit = () => {
    if (verificated) {
      // 提交数据

      // 跳转页面
      Taro.redirectTo({url: '/pages/reviewing/index'})
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
            name="shopName"
            title="店铺名称"
            type="text"
            placeholder="输入店铺名称"
            value={formData.shopName}
            required
            onChange={handleChange}
          />
          <AtInput
            name="ownerName"
            title="店主名称"
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
