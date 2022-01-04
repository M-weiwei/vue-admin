import cookie from 'cookie_js'
import {
    removeToken,
    removeuserNmae
} from '@/utils/app'
export default {
    namespaced: true,
    state: {
        //定义菜单状态
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
        token: '',
        userName: cookie.get('username') || ''
    },
    mutations: {
        Set_isCollapse(state) {
            state.isCollapse = !state.isCollapse
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        },
        Set_token(state, token) {
            state.token = token
            console.log(state.token);
        },
        Set_userName(state, usermane) {
            state.usermane = usermane
        }
    },
    actions: {
        exit({
            commit
        }) {
            return new Promise((resolve, reject) => {
                removeToken()
                removeuserNmae()
                commit('Set_token', '')
                commit('Set_userName', '')
                resolve();
            })
        }
    },
    modules: {},
}