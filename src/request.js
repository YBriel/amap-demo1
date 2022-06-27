/*
 * @Descripttion:
 * @version:
 * @Author: tsunami
 * @Date: 2022-03-22 11:14:23
 * @LastEditors: tsunami
 * @LastEditTime: 2022-04-02 13:27:11
 */
import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'multipart/form-data'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  //baseURL: 'http://192.168.1.2:8090',
 // baseURL: 'https://www.bonaxl.com:8090',
  // 超时
  timeout: 60000
})
// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
        console.log("yay",res)
    // 未设置状态码则默认成功状态
    const code = res.data.code;

    if (code==0){
        return res.data
    }
    if(res.status===200){
        return res.data;
    }
    if (res.data.status == '1'){
      return res.data.route
    }

    if (!res.data){
      return Promise.reject('error')
    }
    return Promise.reject('error')
  },
  error => {
    console.log('err' + error)
    let { message } = error;

    return Promise.reject(error)
  }
)

export default service
