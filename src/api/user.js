import httpRequest from '@/utils/servers'

export const getUserInfo = () => {
  return httpRequest.get('/api/userinfo')
}
