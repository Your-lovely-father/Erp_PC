/*
 * @Descripttion:
 * @version:
 * @Date: 2020-04-08 12:00:06
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

const reportRule =   { path: '/report',component: () => import('../views/Report/Report')};
const buildingRule =  {path: '/building',component: () => import('../views/Building/Building')};
const intentionRule = {path: '/intention', component: () => import('../views/Intention/Intention')};
const storesRule =  {path: '/stores',component: () => import('../views/Stores/Stores')};
const logRule =  {path: '/log',component: () => import('../views/Log/Log')};
const lookRule =  {path: '/look',component: () => import('../views/Look/Look')};
const trackingRule =  {path: '/tracking',component: () => import('../views/Tracking/Tracking')};
const employeesRule = {path: '/employees',component: () => import('../views/Employees/Employees')};
const roleRule =  {path: '/role',component: () => import('../views/Role/Role')};
const adminRule = { path: '/admin',component: () => import('../views/Admin/Admin')};

const ruleMapping={
    'report':reportRule,
    'building':buildingRule,
    'intention':intentionRule,
    'stores':storesRule,
    'log':logRule,
    'look':lookRule,
    'tracking':trackingRule,
    'employees':employeesRule,
    'role':roleRule,
    'admin':adminRule,
};
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
            component: () => import('../views/Login/Login'),
        },
        {
            path: '/body',
            component: () => import('../views/Body/Body'),
            redirect: '/browse',
            // redirect: '/report',

            children: [
                //总览
                {
                    path: '/browse',
                    component: () => import('../views/Browse/Browse'),
                },

                //客户报表
                // {
                //     path: '/report',
                //     name: 'Report',
                //     component: () => import('../views/Report/Report'),
                //     meta: {
                //         title: '客户报表'
                //     }
                // },
                //楼盘管理
                // {
                //     path: '/building',
                //     name: 'Building',
                //     component: () => import('../views/Building/Building'),
                //     meta: {
                //         title: '楼盘管理'
                //     }
                // },
                //意向楼盘
                // {
                //     path: '/intention',
                //     name: 'Intention',
                //     component: () => import('../views/Intention/Intention'),
                //     meta: {
                //         title: '意向楼盘'
                //     }
                // },
                //门店管理
                // {
                //     path: '/stores',
                //     name: 'Stores',
                //     component: () => import('../views/Stores/Stores'),
                //     meta: {
                //         title: '门店管理'
                //     }
                // },
                //日志管理
                // {
                //     path: '/log',
                //     name: 'Log',
                //     component: () => import('../views/Log/Log'),
                //     meta: {
                //         title: '日志管理'
                //     }
                // },
                //带看管理
                // {
                //     path: '/look',
                //     name: 'Look',
                //     component: () => import('../views/Look/Look'),
                //     meta: {
                //         title: '带看管理'
                //     }
                // },
                //跟进管理
                // {
                //     path: '/tracking',
                //     name: 'Tracking',
                //     component: () => import('../views/Tracking/Tracking'),
                //     meta: {
                //         title: '跟进管理'
                //     }
                // },
                //员工管理
                // {
                //     path: '/employees',
                //     name: 'Employees',
                //     component: () => import('../views/Employees/Employees'),
                //     meta: {
                //         title: '员工管理'
                //     }
                // },
                //角色设置
                // {
                //     path: '/role',
                //     name: 'Role',
                //     component: () => import('../views/Role/Role'),
                //     meta: {
                //         title: '角色设置'
                //     }
                // },
                //权限管理
                // {
                //     path: '/admin',
                //     name: 'Admin',
                //     component: () => import('../views/Admin/Admin'),
                //     meta: {
                //         title: '权限管理'
                //     }
                // },
            ],
        },
        //---------------------------------------------------    4 0 4       ----------------------------------------------
        {
            path: "/404",
            component: () => import('../views/Error/404.vue'),
        },
        // {
        //     path: "*", // 此处需特别注意置于最底部
        //     redirect: "/404"
        // }
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
let show = true;
export  function initDynamicRoutes(url) {
    //对路由规则进行动态添加
    router.options.routes[2].children=[router.options.routes[2].children[0]];
    let currentRouters = router.options.routes;
    let rightNav =store.state.navigation;
    let reluAdus =store.state.reluAdus;
    rightNav.forEach((item,index)=>{
        const temp =ruleMapping[item.rule_url];
        if(item.path == url && url != ''){
            if(temp){
                temp.meta=reluAdus;
            }
        }
       if(item.son){
           item.son.forEach((el,i)=>{
               let temps =ruleMapping[el.rule_url];
               if(item.path == url && url != ''){
                   if(temps){
                       temps.meta=reluAdus;
                   }
               }
               currentRouters[2].children.push(temps);
           });
       }
       if(temp){
            currentRouters[2].children.push(temp)
       }
    });
    if(show){
        currentRouters.push({path: "*", redirect: "/404"});
        show=false;
    }
    router.addRoutes(currentRouters);
}
export default router
