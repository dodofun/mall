import Taro from '@tarojs/taro'
import {getOssSignature} from '@/action'
import {APP_CONSTANTS} from '@/config'

export const upload = async (key, filePath, name) => {
  return new Promise(async (resolve, reject) => {
    const ossSign = await getOssSignature({bucket: 'ydhl-assets'})
    Taro.uploadFile({
      url: APP_CONSTANTS.ASSETS_HOST,
      filePath,
      name: 'file',
      formData: {
        name,
        key: key,
        policy: ossSign.policy,
        OSSAccessKeyId: ossSign.accessId,
        success_action_status: '200',
        signature: ossSign.signature,
      },
    }).then((res) => {
      if (res.statusCode == 200) {
        console.log('上传成功：', APP_CONSTANTS.ASSETS_HOST + '/' + key)
        resolve(APP_CONSTANTS.ASSETS_HOST + '/' + key)
        return
      }
      reject(false)
    })
  })
}
