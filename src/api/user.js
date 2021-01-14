import httpRequest from '@/utils/servers'
import {commonHttpRequest} from '@/utils/servers/utils'

export const getUserInfo = () => {
  return commonHttpRequest(
    'app',
    'get',
    {ownerId: 1, id: 2},
    {page: 1, size: 10},
  )
}

export const getUserInfoV2 = () => {
  return httpRequest.get('/api/userinfo')
}
