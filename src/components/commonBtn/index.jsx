import React from 'react'
import {AtButton} from 'taro-ui'
import './index.scss'

export default function ({
  disabled = false,
  loading = false,
  text,
  onClick = () => {},
}) {
  return (
    <AtButton
      disabled={disabled}
      loading={loading}
      className="btn"
      onClick={() => {
        onClick()
      }}>
      {text}
    </AtButton>
  )
}
