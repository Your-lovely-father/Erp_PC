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
                            <span class="iconfont icon-shuaxin" @click="refresh"></span>
                        </div>
                        <div class="header-right" @mousemove="move" @mouseleave="leave">
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
                                                    <el-dropdown-item class="exit_Btn">
                                                        <p @click="updPass()">修改密码</p>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item class="exit_Btn">
                                                        <p @click="exit()">退出</p>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </li>
                                        </ol>
                                    </li>
                                </ul>
                            </el-dropdown>
                        </div>
                    </div>
                </el-header>
                <!--         面包屑导航           -->
                <div class="crumbs" v-show="page">
                    <div class="arrow1" @click="gotoPage(prevIndex)">
                        <p class="iconfont icon-xiangzuoshuangjiantou"></p>
                    </div>
                    <ul class="crumbs_content" :style="{width:currentIndex + 'px',left:left + 'px'}">
                        <li v-for="(itme,index) in tags" :key="index" @click="gotoPage(index)">
                            <div class="border-top"></div>
                            <div class="listContent">
                                <router-link to="" tag="p">{{itme.title}}</router-link>
                                <p class="el-icon-close"></p>
                            </div>
                        </li>
                    </ul>
                    <div class="position_box">
                        <div class="right_box">
                            <div class="left" @click="gotoPage(nextIndex)">
                                <span class="iconfont icon-xiangyoushuangjiantou"></span>
                            </div>
                            <div class="left" @mousemove="crumbsMove" @mouseleave="crumbsLeave">
                                <span class="iconfont icon-xiajiantou_huaban"></span>
                                <div class="down" v-show="crumbsText">
                                    <p>关闭当前标签</p>
                                    <p>关闭所有标签</p>
                                    <!--                                <p>关闭面包屑导航</p>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--       主体区域         -->
                <el-main>
                    <transition name="fade-transform" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
        <myPassword :isShowPassword.sync="isShowPassword"/>
        <myExit :isExit.sync="isExit"/>
    </div>
</template>

<script>
    import  myPassword from './Password/Password'
    import myExit from './Exit/Exit'
    export default {
        name: "Home",
        components:{
            myPassword,
            myExit

        },
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
                crumbsText: false,//面包屑
                page:false,
                currentIndex: 1595,   //默认页
                left: 0,
                isShowPassword: false,//修改密码
                isExit:false,//退出
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
                        name: '意向楼盘',
                        path: 'intention'
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
                },
                tags: [
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    },
                    {
                        title: '啦啦啦'
                    }
                ]
            }
        },
        methods: {
            exit() {
                this.isExit=true
            },
            up() {
                this.isCollapsed = !this.isCollapsed;
                this.isLogoText = !this.isLogoText;
                this.flag = !this.flag
            },
            move() {
                this.isShowIcon = true
            },
            leave() {
                this.isShowIcon = false
            },
            crumbsMove() {
                this.crumbsText = true
            },
            crumbsLeave() {
                this.crumbsText = false
            },
            gotoPage(index) {
                this.currentIndex = index;
            },
            updPass(){
                this.isShowPassword=true
            },
            refresh(){
                this.$router.go(0)
            }
        },
        computed: {
            //上一张
            prevIndex() {
                if (this.currentIndex == 1595) {
                    return this.tags.length - 1;
                } else {
                    return this.currentIndex - 1;
                }
            },
            //下一张
            nextIndex() {
                // if(this.currentIndex == 1595) {
                this.left = this.currentIndex * 2
                // }
            }
        }
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

    .home>>>.el-main {
        background-color: #f0f2f5;
        padding: 0 !important;
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
    .icon-shuaxin{
        cursor: pointer;
        margin-left: 50px;
        font-size: 18px;
        font-weight: bolder;
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

    .exit_Btn {
        width: 70px;
        text-align: center;
    }

    .crumbs {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        position: relative;
        margin-top: 1px;
    }

    .arrow1 {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-right: 1px #eee solid;
        position: absolute;
        top: 0;
        left: 0;
        background: #ffffff;
    }

    .position_box {
        position: absolute;
        top: 0;
        right: 0;
        background: #ffffff;
    }

    .arrow1:hover {
        background: #eee;
    }

    .left:hover {
        background: #eee;
    }

    .left {
        border-left: 1px #eee solid;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .right_box {
        display: flex;
        position: relative;
    }

    .crumbs_content {
        width: 1595px;
        overflow: hidden;
        display: flex;
        position: relative;
        margin-left: 40px;
    }

    .crumbs_content > li {
        width: 115px;
        display: flex;
        position: relative;
    }

    .listContent {
        width: 150px;
        height: 40px;
        display: flex;
        align-items: center;
        border-right: 1px #eee solid;
        padding: 0 10px;
    }

    .border-top {
        position: absolute;
        top: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(#28a9ea, #1981e4);
    }

    .crumbs_content > li:hover .border-top {
        animation: myfirst 1s;
        -webkit-animation-fill-mode: forwards;

    }

    @keyframes myfirst {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    .listContent > p:nth-child(1) {
        min-width: 80px;
    }

    .listContent > p:nth-child(2) {
        border-radius: 50%;
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
    }

    .listContent > p:nth-child(2):hover {
        background: red;
        color: #ffffff;

    }

    .listContent:hover {
        background: #eee;
    }

    .down {
        width: 130px;
        position: absolute;
        top: 40px;
        left: -50px;
        background: #ffffff;
        border: 1px solid #eee;
        z-index: 99;
    }

    .down > p {
        font-size: 10px;
        color: #333333;
        margin: 5px 0;
    }

    .down > p:hover {
        background: #eee;
    }
    /* fade */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.28s;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    /* fade-transform */
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all .5s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-5px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(5px);
    }

    /* breadcrumb transition */
    .breadcrumb-enter-active,
    .breadcrumb-leave-active {
        transition: all .5s;
    }

    .breadcrumb-enter,
    .breadcrumb-leave-active {
        opacity: 0;
        transform: translateX(20px);
    }

    .breadcrumb-move {
        transition: all .5s;
    }

    .breadcrumb-leave-active {
        position: absolute;
    }
</style>
