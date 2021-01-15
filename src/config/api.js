import {APP_CONSTANTS} from './index'
/***
 * 接口地址
 */

/***
 * 代理请求
 * @type {string}
 */
export const NETWORK_AGENT = `/network/agent`

/***
 * 获取 accesstoken
 * @type {string}
 */
export const QUERY_WX_TOKEN = `/wx/mp/getToken`

/***
 * 根据appid获取小程序相关信息
 * @type {string}
 */
export const QUERY_APPINFO_BY_APPID = `/v1/owner/${APP_CONSTANTS.APP_OWNERID}/app/{appid}`

/***
 * 根据 code 获取用户信息
 * @type {string}
 */
export const WX_CODE_TO_SESSION = `/wx/mp/code2Session`

/***
 * 授权获取微信用户相关信息
 * @type {string}
 */
export const WX_GET_USERINFO = `/wx/mp/getUserInfo`
