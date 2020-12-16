// eslint-disable-next-line import/no-commonjs
module.exports = {
  root: true,
  extends: ['taro/react', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  rules: {
    'prefer-const': 2,
    'no-const-assign': 2,
    'import/first': 0,
  },
}
