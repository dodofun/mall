export default {
  pages: ['pages/index/index', 'pages/order/index', 'pages/mine/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#A9A8A8',
    selectedColor: '#ff752f',
    borderStyle: 'white',
    backgroundColor: '#ffffff',
    position: 'bottom',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './assets/image/index.png',
        selectedIconPath: './assets/image/index_sel.png',
      },
      {
        pagePath: 'pages/order/index',
        iconPath: './assets/image/order.png',
        selectedIconPath: './assets/image/order_sel.png',
      },
      {
        pagePath: 'pages/mine/index',
        iconPath: './assets/image/mine.png',
        selectedIconPath: './assets/image/mine_sel.png',
      },
    ],
  },
  networkTimeout: {
    request: 60000,
    connectSocket: 60000,
    uploadFile: 60000,
    downloadFile: 60000,
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
}
