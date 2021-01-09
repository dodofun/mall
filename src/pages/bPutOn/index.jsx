import React, {useState, useEffect} from 'react'
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro'
import {View, Picker} from '@tarojs/components'
import {
  AtForm,
  AtInput,
  AtButton,
  AtImagePicker,
  AtList,
  AtListItem,
} from 'taro-ui'
import './index.scss'
import dayjs from 'dayjs'

const defaultFormData = {
  cover: '',
  name: '',
  personNum: 10,
  price: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  couponDesc: '',
  couponEndDate: '',
}
const personNum = [5, 10, 15, 20, 25, 30, 40, 50, 100]
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
            name="name"
            title="商品描述"
            type="text"
            placeholder="例：冰糖西瓜3kg"
            value={formData.name}
            required
            onChange={handleChange}
          />
          <Picker
            mode="selector"
            value={1}
            range={personNum}
            onChange={(e) => {
              setFormData({...formData, personNum: personNum[e.detail.value]})
            }}>
            <AtList>
              <AtListItem
                title="参与人数"
                extraText={formData.personNum + '人'}
                arrow="right"
              />
            </AtList>
          </Picker>
          <AtInput
            name="price"
            title="商品价格"
            type="digit"
            placeholder="输入商品价格(元)"
            value={formData.price}
            required
            onChange={handleChange}
          />
        </AtForm>
      </View>
      <View className="form-card">
        <View className="form-title">活动时间</View>
        <AtForm className="form-data">
          <Picker
            mode="date"
            value={formData.startDate}
            start={dayjs().format('YYYY-MM-DD')}
            onChange={(e) => {
              if (formData.startTime) {
                setFormData({
                  ...formData,
                  startDate: e.detail.value,
                })
              } else {
                setFormData({
                  ...formData,
                  startDate: e.detail.value,
                  startTime: dayjs().format('HH:mm'),
                })
              }
            }}>
            <AtList>
              <AtListItem
                title="上架日期"
                extraText={formData.startDate}
                arrow="right"
              />
            </AtList>
          </Picker>
          <Picker
            mode="time"
            value={formData.startTime}
            onChange={(e) => {
              setFormData({...formData, startTime: e.detail.value})
            }}>
            <AtList>
              <AtListItem
                title="上架时间"
                extraText={formData.startTime}
                arrow="right"
              />
            </AtList>
          </Picker>
          <Picker
            style={{marginTop: '20px'}}
            mode="date"
            value={formData.endDate}
            start={dayjs().format('YYYY-MM-DD')}
            onChange={(e) => {
              if (formData.endTime) {
                setFormData({
                  ...formData,
                  endDate: e.detail.value,
                })
              } else {
                setFormData({
                  ...formData,
                  endDate: e.detail.value,
                  endTime: dayjs().format('HH:mm'),
                })
              }
            }}>
            <AtList>
              <AtListItem
                title="截止日期"
                extraText={formData.endDate}
                arrow="right"
              />
            </AtList>
          </Picker>
          <Picker
            mode="time"
            value={formData.endTime}
            onChange={(e) => {
              setFormData({...formData, endTime: e.detail.value})
            }}>
            <AtList>
              <AtListItem
                title="截止时间"
                extraText={formData.endTime}
                arrow="right"
              />
            </AtList>
          </Picker>
        </AtForm>
      </View>
      <View className="form-card">
        <View className="form-title">优惠券信息</View>
        <AtForm className="form-data">
          <AtInput
            name="couponDesc"
            title="使用描述"
            type="text"
            placeholder="例：满10元可用，仅限水果类"
            value={formData.couponDesc}
            required
            onChange={handleChange}
          />
          <Picker
            mode="date"
            value={formData.couponEndDate}
            start={dayjs().format('YYYY-MM-DD')}
            onChange={(e) => {
              setFormData({...formData, couponEndDate: e.detail.value})
            }}>
            <AtList>
              <AtListItem
                title="有效期"
                extraText={formData.couponEndDate}
                arrow="right"
              />
            </AtList>
          </Picker>
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
