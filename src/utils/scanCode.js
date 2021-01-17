import Taro from '@tarojs/taro'

export const scanCode = async () => {
  const res = await Taro.scanCode()
  if (res.errMsg.indexOf('ok') > -1) {
    const val = res.result
    if (val) {
      if (val.startsWith('writeOff:order:')) {
        const data = val.replace('writeOff:order:', '')
        return data.split(',')
      }
    }
  }
}
