const constants = {
  API_HOST: 'https://test.com',
  OPEN_MOCK: true,
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
