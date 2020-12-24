const loadModules = () => {
  const requireModule = require.context('./', false, /\.js$/)

  let res = {}
  requireModule.keys().forEach((fileName) => {
    if (fileName === './index.js') return
    res = {...res, ...requireModule(fileName).default}
  })

  return res
}

export const runMock = (request) => {
  return loadModules()[`${request.method} ${request.url}`]
}

export default runMock
