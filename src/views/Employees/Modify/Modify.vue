<template>
    <div class="reportAdd" v-show="updEmployees">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改员工
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
                        <p>修改员工</p>
                    </div>
                    <div class="content_box">
                        <div class="box_form">
                            <div class="form">
                                <div class="int_box">
                                    <label>姓名</label>
                                    <el-input
                                            placeholder="请输入姓名"
                                            v-model="selectUpd.user_name"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>电话</label>
                                    <el-input
                                            placeholder="请输入电话"
                                            v-model="selectUpd.user_phone"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>年龄</label>
                                    <el-input
                                            placeholder="请输入年龄"
                                            v-model="selectUpd.user_age"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <!--                        <div class="int_box">-->
                                <!--                            <label>职位</label>-->
                                <!--                            <el-input-->
                                <!--                                    placeholder="请输入职位"-->
                                <!--                                    v-model="position"-->
                                <!--                                    clearable-->
                                <!--                                    class="report_int"-->
                                <!--                            >-->
                                <!--                            </el-input>-->
                                <!--                        </div>-->
                                <div class="int_box">
                                    <label>性别</label>
                                    <el-input
                                            placeholder="请输入性别"
                                            v-model="selectUpd.user_sex === 10 ? '男' : '女'"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>身份证号</label>
                                    <el-input
                                            placeholder="请输入身份证号"
                                            v-model="selectUpd.user_id_card"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <!--                        <div class="int_box">-->
                                <!--                            <label>账号</label>-->
                                <!--                            <el-input-->
                                <!--                                    placeholder="请输入账号"-->
                                <!--                                    v-model="account"-->
                                <!--                                    clearable-->
                                <!--                                    class="report_int"-->
                                <!--                            >-->
                                <!--                            </el-input>-->
                                <!--                        </div>-->
                                <!--                        <div class="int_box">-->
                                <!--                            <label>密码</label>-->
                                <!--                            <el-input-->
                                <!--                                    placeholder="请输入密码"-->
                                <!--                                    v-model="password"-->
                                <!--                                    clearable-->
                                <!--                                    class="report_int"-->
                                <!--                            >-->
                                <!--                            </el-input>-->
                                <!--                        </div>-->
                                <!--                        <div class="int_box">-->
                                <!--                            <label>角色管理</label>-->
                                <!--                            <el-input-->
                                <!--                                    placeholder="请输入角色管理"-->
                                <!--                                    v-model="role"-->
                                <!--                                    clearable-->
                                <!--                                    class="report_int"-->
                                <!--                            >-->
                                <!--                            </el-input>-->
                                <!--                        </div>-->
                                <div class="int_box">
                                    <label>门店</label>
                                    <el-input
                                            placeholder="请输入门店"
                                            v-model="selectUpd.storefront_id"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="state">
                                <div class="int_box">
                                    <label>状态</label>
                                    <el-switch
                                            v-model="selectUpd.user_status === 1 ? true :false "
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            @change="changeSwitch(selectUpd.user_status)"
                                    >
                                    </el-switch>
                                </div>
                                <div class="int_box">
                                    <label>开通手机端</label>
                                    <el-switch
                                            v-model="selectUpd.mobile_terminal_status === 1 ? true :false "
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            @change="moveSwitch(selectUpd.mobile_terminal_status)"
                                    >
                                    </el-switch>
                                </div>
                            </div>
                            <div class="upload">
                                <div class="int_box">
                                    <label>头像</label>
                                    <el-upload
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card"
                                            :on-preview="headHandlePictureCardPreview"
                                            :on-remove="headHandleRemove"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="headDialogVisible">
                                        <img width="100%" :src="headDialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <el-button @click="cancel" size="medium">取消</el-button>
                        <el-button type="primary" @click="confirm" size="medium">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import  Api from '../../../api/Employees/Employees'
    export default {
        data() {
            return {
                headDialogImageUrl: '',
                headDialogVisible: false,
            }
        },
        methods: {
            onPage() {
                this.$store.commit('isUpdEmployees', true);
                this.$store.commit('isUpdStatusEmployees', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                Api.postUpd(selectUpd).then((res)=>{

                });
                this.onPage()
            },
            headHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            headHandlePictureCardPreview(file) {
                this.headDialogImageUrl = file.url;
                this.headDialogVisible = true;
            },
            changeSwitch(status) { //状态切换开关
                if (status === 1) {
                    this.selectUpd.user_status = 2
                } else {
                    this.selectUpd.user_status = 1
                }
            },
            moveSwitch(status) { //开通手机端切换开关
                if (status === 1) {
                    this.selectUpd.mobile_terminal_status = 2
                } else {
                    this.selectUpd.mobile_terminal_status = 1
                }
            },
        },
        computed: {
            updEmployees() {
                return this.$store.state.employees.updEmployees
            },
            selectUpd() {
                return this.$store.state.employees.selectUpd
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

    .box_form {
        width: 100%;
    }

    .form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .report_int {
        width: 480px;
    }
    .status_upload_box{
        width: 100%;
    }
    .state{
        width: 480px;
        display: flex;
        justify-content: space-between;
        margin-left: 35px;
    }
    .upload{
        margin-left: 35px;
    }
    label {
        display: block;
        padding: 20px 0;
    }
    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
