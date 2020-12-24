const getBaseUrl = (url) => {
  // 根据 url 不同，配置不同的 URL
  let baseUrl = ''
  switch (url) {
    case '/api':
      baseUrl = ''
      break
  }
  return baseUrl
}

export default getBaseUrl
