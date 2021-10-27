/**请求路径
 *
 */
import { post, get } from '@/request/request'

export default {
  // instance
  login: params => {
    return post('apizb/zb_people/login.x', params)
  }
}
