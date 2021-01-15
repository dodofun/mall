import {APP_CONSTANTS} from '@/config'
import {isUrl} from '../common'

const getBaseUrl = (url = '') => {
  return isUrl(url) ? '' : APP_CONSTANTS.API_HOST
}

export default getBaseUrl
