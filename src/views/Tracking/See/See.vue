<template>
    <div class="reportAdd" v-show="seeTracking">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        查看跟进
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
                        <p>查看跟进</p>
                    </div>
                    <div class="content_box">
                        <div class="See_int">
                            <div class="int left">
                                <label>跟进记录</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model="record_content"
                                >
                                </el-input>
                            </div>
                            <div class="int_box_right">
                                <label>时间</label>
                                <el-date-picker
                                        v-model="followDate"
                                        placeholder="选择日期"
                                        class="data"
                                        :disabled="true"
                                        value-format="yyyy-MM-dd"
                                >
                                </el-date-picker>
                                -
                                <el-time-picker
                                        v-model="followTime"
                                        placeholder="选择时间"
                                        class="data"
                                        :disabled="true"
                                        value-format="HH:mm:ss"
                                >
                                </el-time-picker>
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
            return {
                record_content:'',
                followDate:'',
                followTime:'',
            };
        },
        methods: {
            onPage() {
                this.$store.commit('isTracking', true);
                this.$store.commit('isSeeTracking', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
            parentMsg(){
                this.detailList;
            },
            setData(data){
                this.record_content=data.record_content;
                this.followDate=data.follow_time;
                this.followTime=data.follow_time;
            }
        },
        computed: {
            seeTracking() {
                return this.$store.state.tracking.seeTracking
            },
            detailList(){
                this.setData(this.$store.state.tracking.detailList);
                return this.$store.state.tracking.detailList
            }
        },
        mounted() {
            this.detailList
        }
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
    .report_int{
        width: 300px;
        margin-right: 20px;
    }
    .content_box{
        width: 100%;
    }
    .See_int{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .left{
        margin-left: 32px;
    }
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>


