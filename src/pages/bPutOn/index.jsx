import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtForm, AtInput, AtButton, AtImagePicker} from 'taro-ui'
import './index.scss'

const defaultFormData = {
  cover: '',
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
  const [files, setFiles] = useState([])

  useEffect(() => {
    console.log('formData.cover', formData.cover)
    if (formData.cover) {
      setFiles([{url: formData.cover}])
    } else {
      setFiles([])
    }
  }, [formData.cover])

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
    <View className="b-put-on">
      <View className="form-card">
        <View className="form-title">商品图片</View>
        <AtImagePicker
          className="images"
          count={1}
          multiple={false}
          files={files}
          length={2}
          mode="scaleToFill"
          showAddBtn={files.length === 0}
          onChange={(fileList) => {
            if (fileList.length > 0) {
              console.log('fileList', fileList, fileList[0].url)
              setFormData({...formData, cover: fileList[0].url})
              // 上传图片
            } else {
              setFormData({...formData, cover: ''})
            }
          }}
        />
      </View>
      <View className="form-card">
        <View className="form-title">商品信息</View>
        <AtForm className="form-data">
          <AtInput
            name="shopName"
            title="商品描述"
            type="text"
            placeholder="例：冰糖西瓜3kg"
            value={formData.shopName}
            required
            onChange={handleChange}
          />
          <AtInput
            name="ownerName"
            title="参与人数"
            type="number"
            placeholder="输入参与人数"
            value={formData.ownerName}
            required
            onChange={handleChange}
          />
          <AtInput
            name="mobile"
            title="商品价格"
            type="digit"
            placeholder="输入商品价格"
            value={formData.mobile}
            required
            onChange={handleChange}
          />
          <AtInput
            name="mobile"
            title="上架时间"
            type="phone"
            placeholder="输入商品价格"
            value={formData.mobile}
            required
            onChange={handleChange}
          />
          <AtInput
            name="mobile"
            title="截止时间"
            type="phone"
            placeholder="输入商品价格"
            value={formData.mobile}
            required
            onChange={handleChange}
          />
        </AtForm>
      </View>
      <View className="form-card">
        <View className="form-title">优惠券描述</View>
        <AtForm className="form-data">
          <AtInput
            name="province"
            title="使用描述"
            type="text"
            placeholder="例：满10元可用，仅限水果类"
            value={formData.province}
            required
            onChange={handleChange}
          />
          <AtInput
            name="city"
            title="截止时间"
            type="text"
            placeholder="输入城市"
            value={formData.city}
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
          确认发布
        </AtButton>
      </View>
    </View>
  )
}
