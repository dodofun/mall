import camelCase from 'lodash/camelCase'

const requireModule = require.context('./', false, /\.js$/)
const res = {}

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') return

  const name = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))

  res[name] = requireModule(fileName).default
})

export default res
