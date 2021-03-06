const constants = {
  OPEN_MOCK: false,
  API_HOST: 'https://api.yiduohoulang.com',
}

// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {
    _APP_CONSTANTS: constants,
  },
  plugins: [],
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
  },
}
