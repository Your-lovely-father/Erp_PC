<template>
    <div class="home">
        <el-container class="home-container">
            <!--       侧边栏区域        -->
            <el-aside :width="isCollapsed ? '64px': '200px'">
                <div class="logo">
                    <div class="logo_img">
                        <img src="../../assets/images/logo-ip.png" alt="">
                    </div>

                    <div class="logo_text" v-show="isLogoText">
                        可立刻
                    </div>
                </div>
                <!--       导航区         -->
                <el-menu
                        background-color="#304156"
                        text-color="#fff"
                        active-text-color="#409EFF"
                        :unique-opened="true"
                        :collapse="isCollapsed"
                        :collapse-transition="false"
                        :router="true"
                >
                    <!--        主菜单           -->
                    <el-menu-item :index="'/'+ item.path" v-for="item in list" :key="item.id">
                        <i :class="icon[item.id]" id="icon"></i>
                        <span class="text">{{item.name}}</span>
                    </el-menu-item>

                    <el-submenu :index="'/'+ item.path" v-for="item in navList" :key="item.id">
                        <!--     一级菜单模板区-->
                        <template slot="title">
                            <i :class="icon[item.id]" id="icon"></i>
                            <span class="text">{{item.name}}</span>
                        </template>

                        <!--       二级菜单区域        -->
                        <el-menu-item :index=" '/'+ item1.path" v-for="item1 in item.children" :key="item1.id">
                            <template slot="title">
                                <i :class="childrenIcon[item1.id]" id="icon"></i>
                                <span class="text">{{item1.user}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <el-container>
                <!--       头部区域         -->
                <el-header>
                    <div class="header">
                        <div class="header-left">
                            <span class="iconfont icon-shouqi" @click="up" style="display: block" v-if="flag"></span>
                            <span class="iconfont icon-zhankai" @click="up" style="display: block" v-else></span>
                            <div class="nav-page">
                                <!--  面包屑导航     -->
                                <el-breadcrumb>
                                    <el-breadcrumb-item>{{crumbs}}</el-breadcrumb-item>
                                </el-breadcrumb>
                            </div>
                        </div>
                        <div class="header-right">
                            <el-dropdown>
                                <ul class="exit">
                                    <li>
                                        <p class="p_img">
                                            <img src="http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/267f9e2f07082838685c484ab999a9014c08f11f.jpg"
                                                 alt="">
                                        </p>
                                        <p class="name_title">
                                            王志远
                                        </p>
                                        <p class="icon_top_bottom">
                                            <span class="el-icon-caret-top" v-if="isShowIcon"></span>
                                            <span class="el-icon-caret-bottom" v-else></span>
                                        </p>
                                        <ol class="exit_btn">
                                            <li>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item @click="exit()">退出</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </li>
                                        </ol>
                                    </li>
                                </ul>
                            </el-dropdown>
                        </div>
                    </div>
                </el-header>
                <!--       主体区域         -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                //折叠
                isCollapsed: false,
                //logo字隐藏切换
                isLogoText: true,
                //侧边栏展开收齐按钮
                flag: true,
                //侧边栏数据
                isShowIcon: false,//退出图标切换
                crumbs: '客户报表',
                list: [
                    {
                        id: '0',
                        name: '客户报备',
                        path: 'report'
                    },
                    {
                        id: '1',
                        name: '楼盘管理',
                        path: 'building'
                    },
                    {
                        id: '3',
                        name: '区域管理',
                        path: 'area'
                    },
                    {
                        id: '4',
                        name: '门店管理',
                        path: 'stores'
                    },
                    {
                        id: '5',
                        name: '日志管理',
                        path: 'Log'
                    },
                    {
                        id: '6',
                        name: '带看管理',
                        path: 'look'
                    },
                    {
                        id: '7',
                        name: '跟进管理',
                        path: 'tracking'
                    },
                ],
                navList: [
                    {
                        id: '2',
                        name: '组织架构',
                        path: 'architecture',
                        children: [
                            {
                                id: '0',
                                user: '员工管理',
                                path: 'employees'
                            }
                        ]
                    },
                    {
                        id: '8',
                        name: '权限设置',
                        path: 'permissions',
                        children: [
                            {
                                id: '1',
                                user: '角色设置',
                                path: 'role'
                            },
                            {
                                id: '2',
                                user: '权限管理',
                                path: 'admin'
                            }
                        ]
                    }
                ],
                //一级侧边栏字体图标
                icon: {
                    '0': 'iconfont icon-kehubaobei',
                    '1': 'iconfont icon-loupanguanli',
                    '2': 'iconfont icon-zuzhi',
                    '3': 'iconfont icon-ccgl-yundandayinquyu-3',
                    '4': 'iconfont icon-mendian',
                    '5': 'iconfont icon-rizhiguanli',
                    '6': 'iconfont icon-jingjiren_daikanguanli',
                    '7': 'iconfont icon-genjinguanli',
                    '8': 'iconfont icon-quanxianshezhi1'
                },
                //二级侧边栏菜单
                childrenIcon: {
                    '0': 'iconfont icon-menu-pass-Emp',
                    '1': 'iconfont icon-quanxianshezhi',
                    '2': 'iconfont icon-xitongquanxianshezhi'
                }
            }
        },
        methods: {
            exit() {
                window.sessionStorage.clear();
                this.$router.push('/')
            },
            up() {
                this.isCollapsed = !this.isCollapsed;
                this.isLogoText = !this.isLogoText;
                this.flag = !this.flag
            },
            mouseOver() {
                this.isShowIcon = !this.isShowIcon;
            },
            mouseLeave(){
                this.isShowIcon = !this.isShowIcon;
            }
        },
        // 监听,当路由发生变化的时候执行
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    this.crumbs = val.meta.title
                },
                // 深度观察监听
                deep: true
            }
        },
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
    }

    .el-header {
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    }

    .el-aside {
        background-color: #304156;
    }

    .el-main {
        background-color: #f0f2f5;
    }

    .el-menu {
        border-right: none;
    }

    .el-submenu__icon-arrow {
        display: none;
    }

    .home-container {
        height: 100% !important;
    }

    .header {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .icon-shouqi {
        cursor: pointer;
    }

    .icon-zhankai {
        cursor: pointer;
    }

    .header-right {
        cursor: pointer;
    }

    .logo {
        width: 100%;
        height: 60px;
        display: flex;
        background: #2b2f3a;
        color: #fff;
        align-items: center;
        justify-content: center;
    }

    .logo_img {
        width: 32px;
        height: 32px;
    }

    .logo_img > img {
        width: 100%;
        height: 32px;
    }

    .logo_text {
        margin-left: 20px;
    }

    .header-left {
        display: flex;
        height: 60px;
        align-items: center;
    }

    .nav-page {
        margin-left: 30px;
        margin-top: 14px;
    }

    #icon {
        font-weight: 400;
        color: #ffffff;
    }

    .text {
        margin-left: 15px;
    }

    .exit {
        height: 60px;
    }

    .exit > li {
        display: flex;
        height: 60px;
        align-items: center;
    }

    .p_img {
        width: 40px;
    }

    .p_img > img {
        width: 100%;
        border-radius: 3px;
    }

    .name_title {
        margin-left: 10px;
    }

    .icon_top_bottom {
        margin-left: 5px;
    }
</style>
