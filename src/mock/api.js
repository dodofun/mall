import mockjs from 'mockjs'

export default {
  'GET /api/userinfo': {
    name: 'luckyadam',
    avatar:
      'https://ydhl-assets.oss-cn-beijing.aliyuncs.com/images/mall/%E7%BB%84%2015%402x.png',
    mobile: '18722223333',
  },
  'GET /api/tags': mockjs.mock({
    'list|1-10': [
      {
        'id|+1': 1,
      },
    ],
  }),
}
