import router from "./index";
import store from "@/store/index"
import {
    getToken,
    removeToken,
    removeuserNmae
} from '@/utils/app'
//路由守卫
//定义路由白名单
const witerRouter = ['/login']
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            removeToken();
            removeuserNmae();
            store.commit("login/Set_token", '')
            store.commit("login/Set_userName", '')
            next();
        } else {
            next();

        }
    } else {
        //判断下次进入路由是否属于login是则进入正常反之跳转到login
        if (witerRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})