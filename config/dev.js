const constants = {
  OPEN_MOCK: true,
  API_HOST: 'https://test.com',
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
