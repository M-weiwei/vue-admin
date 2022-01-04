import service from '@/utils/request.js'
/**
 * 获取验证码
 */
export function GetSms(data) {
    return service.request({
        method: 'post',
        url: '/vue_admin_api/getSms/',
        data: data
    })
}
/**
 * 获取用户角色
 */
/**
 * 登录
 */
export function Login(data) {
    return service.request({
        method: 'post',
        url: '/vue_admin_api/token/login/',
        data: data
    })
}
/**
 * 注册
 */
export function Register(data) {
    return service.request({
        method: 'post',
        url: '/vue_admin_api/register/',
        data: data
    })

}