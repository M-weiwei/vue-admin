import {
    createRouter,
    createWebHashHistory
} from "vue-router";

import Login from '../views/Login/Login.vue'
const routes = [
    //登录重定向
    {
        path: "/",
        redirect: "/login",
        meta: {
            name: '登录'
        },
        hiddren: true
    },
    //登录
    {
        path: '/login',
        component: Login,
        hiddren: true,
        meta: {
            name: '控制台'
        },
    },
    //控制台首页
    {
        path: '/console',
        component: () => import("../views/Layout/Layout.vue"),
        meta: {
            name: '控制台'
        },
        name: 'console',
        redirect: '/index',
        children: [{
                path: '/index',
                component: () => import("../views/Console/Console.vue"),
                meta: {
                    name: '控制台',
                    info: 'icon-kongzhitai'
                },
                children: [{
                    path: '/index',
                    component: () => import("../views/Console/Console.vue"),
                    meta: {
                        name: '首页'
                    },
                }]
            },
            //信息管理
            {
                path: '/info',
                component: () => import("../views/Info/Index.vue"),
                meta: {
                    name: '信息管理',
                    info: 'icon-icon_xinyong_xianxing_jijin-'

                },
                redirect: '/infoList',
                children: [{
                    path: '/infoList',
                    component: () => import("../views/Info/InfoList.vue"),
                    meta: {
                        name: '信息列表'
                    },
                }, {
                    path: '/infoCategory',
                    component: () => import("../views/Info/InfoCategory.vue"),
                    meta: {
                        name: '信息分类'
                    },
                }]
            },
            //用户路由
            {
                path: '/user',
                component: () => import("../views/Layout/User/User.vue"),
                meta: {
                    name: '用户管理',
                    info: 'icon-yonghuguanli'

                },
                children: [{
                    path: '/userIndex',
                    component: () => import("../views/Layout/User/UserList.vue"),
                    meta: {
                        name: '用户列表'
                    },
                }]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;