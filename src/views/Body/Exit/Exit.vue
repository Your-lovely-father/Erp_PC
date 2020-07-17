<template>
    <div class="updPass_box" v-show="isExit">
        <div class="updPass">
            <div class="updPass_conntent">
                <div class="upd_title">
                    <div class="title_box">
                        <div></div>
                        <div class="title">
                            退出登陆
                        </div>
                        <div class="icon" @click="cancel">
                            <p class="el-icon-close" style="cursor:pointer"></p>
                        </div>
                    </div>
                </div>
                <div class="content_form">
                   <p>
                       确定要退出吗 ？
                   </p>
                </div>
                <div class="footer_btn">
                    <el-button @click="cancel" size="small">取 消</el-button>
                    <el-button type="primary" @click="confirm" size="small">确 定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isExit: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            cancel() {
                this.$emit("update:isExit", false);
            },
            confirm() {
                this.$emit("update:isExit", false);
                window.localStorage.clear();
                window.location.reload();
                this.$router.push('/')
            }
        },
    }
</script>

<style scoped>
    .updPass_box{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 99;
    }
    .updPass{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .updPass_conntent{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #ffffff;
        width: 300px;
        height: 180px;
        border-radius: 5px;
    }
    .upd_title{
        width: 100%;
        background: #eee;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .title_box{
        padding: 0 20px;
        width: 90%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        font-size: 16px;
    }
    .el-icon-close{
        font-size: 18px;
        font-weight: bold;
    }
    .footer_btn{
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 0;
        padding: 20px 0;
    }
    .content_form{
        width: 100%;
    }
    .content_form>p{
       margin-top: 30px;
        margin-left: 20px;
    }
    .int_box>span{
        padding-right:20px;
    }
</style>
