export default {
  pages: [
    'pages/bWelfarePutOn/index', // 福利发布

    'pages/index/index', // 用户首页
    'pages/welfare/index', // 福利页
    'pages/bHome/index', // 商户主页
    'pages/bOrder/index', // 商户订单
    'pages/bPutOn/index', // 商品上架
    'pages/bWithdrawal/index', // 提现
    'pages/bWriteOff/index', // 核销
    'pages/bIncomeRecord/index', // 收益记录
    'pages/bWithdrawalRecord/index', // 提现记录
    'pages/joinUs/index', // 商家入驻
    'pages/joinUsForm/index', // 商家入驻表单
    'pages/reviewing/index', // 入驻审核
    'pages/mine/index', // 我的主页
    'pages/contactUs/index', // 联系我们
    'pages/order/index', // 订单
    'pages/coupon/index', // 优惠券
    'pages/paySuccess/index', // 支付成功
    'pages/orderDetail/index', // 订单详情
    'pages/goodsDetail/index', // 商品详情
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '狂抢派',
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
