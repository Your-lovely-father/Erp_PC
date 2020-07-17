<template>
    <div class="updPass_box" v-show="isShowPassword">
        <div class="updPass">
            <div class="updPass_conntent">
                <div class="upd_title">
                    <div class="title_box">
                        <div></div>
                        <div class="title">
                            修改密码
                        </div>
                        <div class="icon" @click="cancel">
                            <p class="el-icon-close" style="cursor:pointer"></p>
                        </div>
                    </div>
                </div>
                <el-form :model="ruleForm" :status-icon='false' :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <div class="content_form">
                        <el-form-item label="手机号" prop="user_phone">
                            <el-input v-model.number="ruleForm.user_phone" class="int"  placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="旧密码" prop="order_password">
                            <el-input type="password" v-model.number="ruleForm.order_password" placeholder="请输入旧密码" class="int"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="new_password">
                            <el-input type="password" v-model.number="ruleForm.new_password" placeholder="请输入新密码" class="int"></el-input>
                        </el-form-item>
                        <div class="footer_btn">
                            <el-button @click="cancel" size="small">取 消</el-button>
                            <el-button type="primary" @click="submitForm('ruleForm')" size="small">确 定</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from '../../../api/Login/Login'

    export default {
        props: {
            isShowPassword: {
                type: Boolean,
                default: false
            }
        },

        data() {
            var validatorPhone = function (rule, value, callback) {
                if (value === '') {
                    callback(new Error('手机号不能为空'))
                } else if (!/^1\d{10}$/.test(value)) {
                    callback(new Error('手机号格式错误'))
                } else {
                    callback(); //重点
                }
            };
            var validatorPass = function (rule, value, callback) {
                if (value === '') {
                    callback(new Error('旧密码不能为空'))
                } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
                    callback(new Error('旧密码长度6-18位'))
                } else {
                    callback(); //重点
                }
            };
            var validatorNewPass = function (rule, value, callback) {
                if (value === '') {
                    callback(new Error('新密码不能为空'))
                } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
                    callback(new Error('新密码长度6-18位'))
                } else {
                    callback(); //重点
                }
            };
            return {
                ruleForm: {
                    user_phone: '',
                    order_password: '',
                    new_password: ''
                },
                rules: {
                    user_phone: [
                        {validator: validatorPhone, trigger: 'blur'}
                    ],
                    order_password: [
                        {validator: validatorPass, trigger: 'blur'}
                    ],
                    new_password: [
                        {validator: validatorNewPass, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            cancel() {
                this.$emit("update:isShowPassword", false);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        Api.upDpassPost(this.ruleForm.user_phone, this.ruleForm.order_password, this.ruleForm.new_password).then((res) => {
                            if (res.code === "200003") {
                                this.$message.success(res.msg);
                            } else {
                                this.$message.error(res.msg);
                            }
                        });
                        this.$emit("update:isShowPassword", false);
                    } else {
                        this.$message.error('所有字段不能为空');
                        return false;
                    }
                });
            },
        },
    }
</script>

<style scoped>
    .updPass_box {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
    }

    .updPass {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .updPass_conntent {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff;
        width: 500px;
        height: 400px;
        border-radius: 5px;
    }

    .upd_title {
        width: 100%;
        background: #eee;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .title_box {
        padding: 0 20px;
        width: 93%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-size: 16px;
    }

    .el-icon-close {
        font-size: 18px;
        font-weight: bold;
    }

    .footer_btn {
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 0;
        padding: 30px 0;
    }

    .content_form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 25px;
    }

    .int {
        width: 300px;
    }

    .int_box > span {
        padding-right: 20px;
    }

    .el-form-item {
        display: flex;
        margin-top: 20px;
    }
</style>
