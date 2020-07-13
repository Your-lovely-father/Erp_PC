<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowsUpd"
        >
            <div class="See_int">
                <!--     表单区域       -->
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
           </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "See",
        props: {
            isShowsUpd: {
                type: Boolean,
                default: false
            },
            selectUpd:{
                type:Object,
                default: {}
            }
        },
        data() {
            return {
                user_name:'',//员工姓名
                user_sex:'',//员工性别
                user_phone:'',//员工手机号
                user_age:'',//员工年龄
                user_id_card:'',//员工身份证号
                user_image:'',//员工头像
                user_password:'',//员工密码
                user_status:'',//员工状态（1开通2锁定）
                user_role:'',//员工角色
                area_id:'',//区域id
                storefront_id:'',//门店id
                mobile_terminal_status:'',//是否开启手机端（1开通2锁定）
                headDialogImageUrl: '',
                headDialogVisible: false,
            }
        },
        methods: {
            cancel() { //取消
                this.$emit("update:isShowsUpd", false);
            },
            confirm() { //确认/修改
                this.$emit("update:isShowsUpd", false);
            },
            headHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            headHandlePictureCardPreview(file) {
                this.headDialogImageUrl = file.url;
                this.headDialogVisible = true;
            },
            changeSwitch(status){ //状态切换开关
                if(status === 1){
                    this.selectUpd.user_status= 2
                }else {
                    this.selectUpd.user_status= 1
                }
            },
            moveSwitch(status){ //开通手机端切换开关
                if(status === 1){
                    this.selectUpd.mobile_terminal_status= 2
                }else {
                    this.selectUpd.mobile_terminal_status= 1
                }
            },
        }
    }
</script>

<style scoped>
    .See {
        width: 100%;

    }

    .See >>> .el-dialog__header {
        display: none !important;
    }

    .form{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .report_int {
        width: 500px;
    }
    .state{
        display: flex;
        width: 500px;
        justify-content: space-between;
    }
    label {
        display: block;
        padding: 15px 0;
    }
</style>
