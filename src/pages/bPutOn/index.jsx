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
import {upload} from '../../utils/upload'
import {createId} from '../../utils/idCreator'
import {commonHttpRequest, checkAndGetResult} from '@/utils/servers/utils'
import {useShopModel} from '@/models/shop'

const defaultFormData = {
  id: 0,
  ownerId: 0,
  type: 0,
  name: '',
  cover: '',
  totalPeople: 10,
  hasPeople: 0,
  price: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  couponDesc: '',
  couponEndDate: '',
  couponAmount: 1,
  enabled: true,
}
const totalPeople = [5, 10, 15, 20, 25, 30, 40, 50]
export default function () {
  const {shop = {}} = useShopModel((model) => [model.shop])
  const [formData, setFormData] = useState(defaultFormData)
  const [verificated, setVerificated] = useState(false)
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (formData.cover) {
      setFiles([{url: formData.cover}])
    } else {
      setFiles([])
    }
  }, [formData.cover])

  useEffect(() => {
    const varif = Object.keys(formData).every((item) => {
      if (typeof formData[item] === 'number') {
        return true
      } else {
        return !!formData[item]
      }
    })
    setVerificated(varif)
  }, [formData])

  const handleChange = (val, e) => {
    setFormData({...formData, [e.target.id]: val})
  }

  const parseTime = (date, time) => {
    return dayjs(date + ' ' + time + ':00').valueOf()
  }

  const submit = () => {
    const id = createId()
    formData.id = id
    if (verificated) {
      // 组装数据
      formData.ownerId = shop.id
      formData.startTime = parseTime(formData.startDate, formData.startTime)
      formData.endTime = parseTime(formData.endDate, formData.endTime)
      setVerificated(false)
      // 提交数据
      Taro.showLoading({title: '发布中'})
      commonHttpRequest(
        'goods',
        'add',
        {ownerId: shop.id, id},
        {},
        formData,
      ).then((res) => {
        Taro.hideLoading()
        if (checkAndGetResult(res)) {
          Taro.showToast({title: '成功发布商品', icon: 'none'})
          setTimeout(() => {
            // 跳转页面
            Taro.switchTab({url: '/pages/index/index'})
          }, 600)
        } else {
          setVerificated(true)
        }
      })
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
          onChange={async (fileList) => {
            if (fileList.length > 0) {
              console.log('fileList', fileList, fileList[0].url)
              const key = `images/goods/${createId()}.png`
              const url = await upload(key, fileList[0].url, '活动商品图')
              if (url) {
                setFormData({...formData, cover: url})
              }
            } else {
              setFormData({...formData, cover: ''})
            }
          }}
          onFail={(msg) => {
            console.log('onFail', msg)
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
            range={totalPeople}
            onChange={(e) => {
              setFormData({
                ...formData,
                totalPeople: totalPeople[e.detail.value],
              })
            }}>
            <AtList>
              <AtListItem
                title="参与人数"
                extraText={formData.totalPeople + '人'}
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
          <AtInput
            name="couponAmount"
            title="优惠券金额"
            type="digit"
            placeholder="输入优惠券金额(元)"
            value={formData.couponAmount}
            required
            onChange={handleChange}
          />
          <Picker
            mode="date"
            value={formData.couponEndDateTxt}
            start={dayjs().format('YYYY-MM-DD')}
            onChange={(e) => {
              if (e.detail.value) {
                setFormData({
                  ...formData,
                  couponEndDateTxt: e.detail.value,
                  couponEndDate: dayjs(e.detail.value + ' 23:59:59').valueOf(),
                })
              } else {
                setFormData({
                  ...formData,
                  couponEndDateTxt: '',
                  couponEndDate: '',
                })
              }
            }}>
            <AtList>
              <AtListItem
                title="有效期"
                extraText={formData.couponEndDateTxt}
                arrow="right"
              />
            </AtList>
          </Picker>
        </AtForm>
      </View>
      <View className="put-on-btn">
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
