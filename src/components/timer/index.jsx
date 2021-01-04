import React, {useState, useEffect} from 'react'
import {View, Image} from '@tarojs/components'
import {AtCountdown} from 'taro-ui'
import dayjs from 'dayjs'
import './index.scss'

export default function ({endTime, onSetEnded}) {
  const [loaded, setLoaded] = useState(false)
  const [diffMillisecond, setDiffMillisecond] = useState(0)
  const [diffTime, setDiffTime] = useState({hours: 0, minutes: 0, seconds: 0})

  useEffect(() => {
    if (endTime) {
      setDiffMillisecond(dayjs(endTime) - dayjs())
    }
  }, [endTime])

  useEffect(() => {
    if (diffMillisecond > 0) {
      setDiffTimeFunc()
    }
  }, [diffMillisecond])

  const setDiffTimeFunc = () => {
    const hours = Math.floor(diffMillisecond / 1000 / 60 / 60)
    const minutes = Math.floor((diffMillisecond / 1000 / 60) % 60)
    const seconds = Math.floor((diffMillisecond / 1000) % 60)
    setDiffTime({hours, minutes, seconds})
    setLoaded(true)
  }

  if (!loaded) {
    return <View></View>
  }

  return (
    <View className="timer">
      <Image
        class="timer-icon"
        src="https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E7%BB%84%2018%402x.png"
      />
      <AtCountdown
        className="timer-main"
        isShowHour
        format={{hours: ':', minutes: ':', seconds: ''}}
        hours={diffTime.hours}
        minutes={diffTime.minutes}
        seconds={diffTime.seconds}
        onTimeUp={() => {
          onSetEnded && onSetEnded(true)
        }}
      />
    </View>
  )
}
