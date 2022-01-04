import cookie from 'cookie_js'
export function getToken() {
    return cookie.get('admin_token')
}
export function setToken(token) {
    return cookie.set('admin_token', token)
}
export function removeToken() {
    return cookie.remove('admin_token')
}
export function userNmae(username) {
    return cookie.set('username', username)
}
export function removeuserNmae() {
    return cookie.remove('username')
}