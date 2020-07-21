<template>
    <div class="reportAdd" v-show="seeLog">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        查看日志
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页"
                                    placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>查看日志</p>
                    </div>
                    <div class="content_box">
                        <div class="See_int">
                            <div class="int">
                                <label>操作人</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model="logSeeObject.user_name"
                                >
                                </el-input>
                            </div>
                            <div class="int">
                                <label>操作时间</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model="logSeeObject.create_time"
                                >
                                </el-input>
                            </div>
                            <div class="int">
                                <label>操作内容</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model="logSeeObject.title"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="int_box">
                            <div class="int">
                                <label>区域管理</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model=" logSeeObject.province_name"
                                >
                                </el-input>
                            </div>
                            <div class="int left">
                                <label>门店管理</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model="logSeeObject.storefront_name"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <el-button size="medium" @click="cancel()">取消</el-button>
                        <el-button type="primary" size="medium" @click="confirm()">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            onPage() {
                this.$store.commit('isLog', true);
                this.$store.commit('isSeeLog', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
        },
        computed: {
            seeLog() {
                return this.$store.state.log.seeLog
            },
            logSeeObject(){
                return this.$store.state.log.logSeeObject
            }
        },
    }
</script>

<style scoped>
    .reportAdd {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .add_box {
        width: 300px;
        height: 300px;
        background: #f0f2f5;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: change 1s;
        -webkit-animation-fill-mode: forwards;
        overflow: hidden;
    }

    @keyframes change {
        from {
            width: 300px;
            height: 300px;
        }

        to {
            width: 100%;
            height: 100%;
        }

    }

    .poor {
        width: 98.2%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px #eee solid;
        background: #eee;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 99;
    }

    .el-icon-close {
        color: #333;
        font-weight: bold;
        font-size: 18px;
    }

    .addContent {
        width: 98.3%;
        margin: 15px;
        background: #ffffff;
        border-radius: 5px;
        margin-top: 55px;
    }

    .The_title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px #eee solid;
        padding-left: 15px;
    }

    .content_box {
        width: 98.3%;
        padding: 15px;
    }

    .footer {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
    }
    label{
        display: block;
        padding: 20px 0;
    }
    .See_int{
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .report_int{
        width: 450px;
    }
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .int_box{
        margin-left: 50px;
        display: flex;
    }
    .left{
        margin-left: 106px;
    }
</style>
