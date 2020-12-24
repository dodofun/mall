import mockjs from 'mockjs'

export default {
  'GET /api/userinfo': {
    name: 'luckyadam',
  },
  'GET /api/tags': mockjs.mock({
    'list|1-10': [
      {
        'id|+1': 1,
      },
    ],
  }),
}
