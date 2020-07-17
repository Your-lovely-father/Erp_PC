<template>
    <div class="reportAdd" v-show="addSRole">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加角色
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>角色信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
                        <div class="form_box">
                            <div class="form">
                                <div class="int_box">
                                    <label>角色名称</label>
                                    <el-input
                                            placeholder="请输角色名称"
                                            v-model="name"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box_right">
                                    <label>时间</label>
                                    <el-date-picker
                                            v-model="date"
                                            type="date"
                                            placeholder="选择日期"
                                            class="data"
                                    >
                                    </el-date-picker>
                                    -
                                    <el-time-picker
                                            v-model="time"
                                            placeholder="选择时间"
                                            class="data"
                                    >
                                    </el-time-picker>
                                </div>
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
                name: '',
                type: [],
                date: '',
                time: '',
            }
        },
        methods: {
            onPage() {
                this.$store.commit('showRole', true);
                this.$store.commit('showStatusRole', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
        },
        computed: {
            addSRole() {
                return this.$store.state.role.addSRole
            },
        },
    }
</script>

<style scoped>
    .reportAdd {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
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
        width: 98.3%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px #eee solid;
        background: #eee;
        justify-content: space-between;
        position: fixed !important;
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
    .form_box{
        width: 100%;
    }
    .form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .report_int {
        width: 300px;
        margin-right: 20px;
    }
    label {
        display: block;
        padding: 20px 0;
    }
</style>
