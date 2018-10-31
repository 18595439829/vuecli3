import axios from 'axios'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
export default {
  tulingGET(data: string) {
    return axios.get('' + data)
  },
  tulingPOST(data: JSON) {
    return axios.post('/api', data)
  }
}
