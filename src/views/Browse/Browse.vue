<template>
    <div class="browse">
        <div class="browse_box">
            <div class="browse_left">
                <div class="tracking">
                    <div class="tracking_title">
                        <p>跟进管理</p>
                    </div>
                    <div class="tracking_content">

                    </div>
                </div>
                <div class="tracking top">
                    <div class="tracking_title">
                        <p>报表</p>
                    </div>
                    <div class="tracking_content">

                    </div>
                </div>
            </div>
            <div class="browse_right">
                <div class="figure">
                    <div class="portrait">
                        <img src="http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/267f9e2f07082838685c484ab999a9014c08f11f.jpg" alt="">
                    </div>
                    <div class="describe">
                        <div class="position">
                            <p>沈阳开发部</p>
                            <p>经纪人</p>
                        </div>
                        <p class="p1">系统号 : <span>1594255555</span></p>
                        <p class="p2">联系电话 : <span>1594255555</span></p>
                    </div>
                </div>
                <div class="profile">
                    <div class="profile_title">
                        <p>公司简介</p>
                        <p class="iconfont icon-gantanhao"></p>
                    </div>
                    <div class="profile_content">
                        <p>一直以来定然不会错过这一拥抱吧。</p>
                    </div>
                </div>
                <div class="tracking tab">
                    <div class="tracking_title">
                        <p>报表</p>
                    </div>
                    <div class="tracking_content">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Browse"
    }
</script>

<style scoped>
    .browse {
        width: 97.7%;
        padding: 20px;
    }
    .browse_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .browse_left{
        width:63.5%;
    }
    .browse_right{
        width: 35%;
    }
    .tracking{
        width: 100%;
        height: 250px;
        background: #ffffff;
        border-radius: 5px;
    }
    .tracking_title{
        width: 100%;
        line-height: 40px;
        border-bottom: 1px #eee solid;
    }
    .tracking_title>p{
        margin-left: 20px;
    }
    .top{
        margin-top: 20px;
        height: 150px;
    }
    .tab{
        height: 260px;
        margin-top: 20px;
    }
    .figure{
        width: 96.5%;
        height: 100.63px;
        background: #ffffff;
        border-radius: 5px;
        padding: 10px;
        display: flex;
    }
    .describe{
        margin-left: 20px;
    }
    .portrait{
        width: 100px;
    }
    .portrait>img{
        width: 100%;
    }
    .position{
        display: flex;
    }
    .position>p:nth-child(1){
        font-size: 18px;
        font-weight: bold;
    }
    .position>p:nth-child(2){
        width: 50px;
        padding: 0 10px;
        height: 24px;
        background: #eee;
        text-align: center;
        line-height: 24px;
        margin-left: 10px;
    }
    .p1{
        margin-top: 15px;
        color: #5e6d82;
    }
    .p2{
        margin-top: 15px;
        color: #5e6d82;
    }
    .profile{
        width: 100%;
        height: 100px;
        background: #ffffff;
        border-radius: 5px;
        margin-top: 20px;
    }
    .profile_title{
        width: 96.5%;
        line-height: 40px;
        padding: 0 10px;
        border-bottom: 1px #eee solid;
        display: flex;
        justify-content: space-between;
    }
    .profile_content>p{
        line-height: 64px;
        padding-left: 10px;
        color: #333;
    }
</style>
