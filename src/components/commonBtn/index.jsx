import React from 'react'
import {AtButton} from 'taro-ui'
import './index.scss'

export default function ({
  disabled = false,
  loading = false,
  text,
  openType = '',
  onClick = () => {},
}) {
  return (
    <AtButton
      openType={openType}
      disabled={disabled}
      loading={loading}
      className="btn"
      onClick={(e) => {
        onClick(e)
      }}>
      {text}
    </AtButton>
  )
}
