/*
 * @Descripttion:
 * @version:
 * @Date: 2020-04-08 12:00:06
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        //登录
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login/Login'),
        },
        {
            path: '/body',
            name: 'Body',
            component: () => import('../views/Body/Body'),
            // redirect: '/browse',
            redirect: '/report',
            children: [
                //总览
                {
                    path: '/browse',
                    name: 'Browse',
                    component: () => import('../views/Browse/Browse'),
                    meta: {
                        title: '客户报表'
                    }
                },
                //客户报表
                {
                    path: '/report',
                    name: 'Report',
                    component: () => import('../views/Report/Report'),
                    meta: {
                        title: '客户报表'
                    }
                },
                //楼盘管理
                {
                    path: '/building',
                    name: 'Building',
                    component: () => import('../views/Building/Building'),
                    meta: {
                        title: '楼盘管理'
                    }
                },
                //区域管理
                {
                    path: '/area',
                    name: 'Area',
                    component: () => import('../views/Area/Area'),
                    meta: {
                        title: '区域管理'
                    }
                },
                //门店管理
                {
                    path: '/stores',
                    name: 'Stores',
                    component: () => import('../views/Stores/Stores'),
                    meta: {
                        title: '门店管理'
                    }
                },
                //日志管理
                {
                    path: '/log',
                    name: 'Log',
                    component: () => import('../views/Log/Log'),
                    meta: {
                        title: '日志管理'
                    }
                },
                //带看管理
                {
                    path: '/look',
                    name: 'Look',
                    component: () => import('../views/Look/Look'),
                    meta: {
                        title: '带看管理'
                    }
                },
                //跟进管理
                {
                    path: '/tracking',
                    name: 'Tracking',
                    component: () => import('../views/Tracking/Tracking'),
                    meta: {
                        title: '跟进管理'
                    }
                },
                //员工管理
                {
                    path: '/employees',
                    name: 'Employees',
                    component: () => import('../views/Employees/Employees'),
                    meta: {
                        title: '员工管理'
                    }
                },
                //角色设置
                {
                    path: '/role',
                    name: 'Role',
                    component: () => import('../views/Role/Role'),
                    meta: {
                        title: '角色设置'
                    }
                },
                //权限管理
                {
                    path: '/admin',
                    name: 'Admin',
                    component: () => import('../views/Admin/Admin'),
                    meta: {
                        title: '权限管理'
                    }
                },
            ],
        },
        //---------------------------------------------------    4 0 4       ----------------------------------------------
        {
            path: "/404",
            name: "Error",
            component: () => import('../views/Error/404.vue'),
        },
        {
            path: "*", // 此处需特别注意置于最底部
            redirect: "/404"
        }
    ]
});

router.beforeEach((to, from, next) => {
    // to 将要进入的路由
    // from 代表从那个路径跳转而来
    // next 放行
    if (to.path === '/login') {
        return next()
    } else {
        const token = store.state.access_token;
        if (!token) {
            return next('/login');
        } else {
            next()
        }
    }
});
export default router
