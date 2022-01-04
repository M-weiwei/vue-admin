import axios from 'axios'
import {
    ElMessage
} from 'element-plus'
/**
 * axios拦截器
 */
const service = axios.create({
    baseURL: '/vue_admin_api',
    timeout: 15000
})
service.interceptors.request.use(function (config) {
    //在请求头添加tokey
    config.headers['Tokey'] = '111111'
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let {
        data
    } = response
    if (data.resCode !== 0) {
        ElMessage.error(data.message)
        return Promise.reject(data)
    } else {
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service