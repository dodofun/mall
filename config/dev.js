const constants = {
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
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
  },
}
