<template>
    <div class="login">
        <!--    logo区域    -->
        <div class="avatar_box">
            <img src="../../assets/images/logo.png" alt="">
        </div>
        <div class="login_box">
            <!--   title区域         -->
            <p class="title_h1">欢迎登陆 <span class="title_h3">可立刻新房源报备系统</span></p>
            <!--    表单区        -->
            <el-form :model="loginForm" class="login_form" :rules="rules" ref="loginFormRef">
                <!--    用户区   -->
                <el-form-item prop="user">
                    <el-input v-model="loginForm.user" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <!--     密码区      -->
                <el-form-item prop="pass">
                    <el-input v-model="loginForm.pass" prefix-icon="el-icon-s-release" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login()" class="color_login">登录</el-button>
                    <el-button type="info" @click="reset" class="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Api from '../../api/Login/Login'
    import {initDynamicRoutes} from '../../router/index'
    export default {
        name: "Login",
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
                    callback(new Error('密码不能为空'))
                } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
                    callback(new Error('密码长度6-18位'))
                } else {
                    callback(); //重点
                }
            };
            return {
                loginForm: {
                    user: '',
                    pass: ''
                },
                rules: {
                    user: [
                        {validator: validatorPhone, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatorPass, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            reset() {
                this.$refs.loginFormRef.resetFields()
            },
            login() {
                this.$refs.loginFormRef.validate(value => {
                    if (!value) return;
                    Api.loginPost(this.loginForm.user, this.loginForm.pass).then((res) => {
                        if (res.code === 200) {
                            this.$message.success('登陆' + res.msg);
                            this.$store.commit('token', res.data.access_token);
                            this.$store.commit('imgAge', res.data.user_image);
                            this.$router.push('/body');
                            Api.navList().then((res)=>{
                                this.$store.commit('navigation',res.data);
                                initDynamicRoutes()
                            });
                            return;
                        } else {
                            this.$message.error(res.msg);
                            return;
                        }
                    })
                })
            }
        },
        computed: {
            token() {
                return this.$store.state.access_token
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 100%;
        background: url("../../assets/images/login_back.png") right no-repeat;
        background-size: 50% 100%;
        position: relative;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-130%, -50%);
        box-shadow: 0px 0px 10px #eee;
        border: 1px #eee solid;
    }

    .avatar_box {
        position: absolute;
        top: 50px;
        left: 100px;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        margin-top: 30px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .title_h1 {
        text-align: center;
        width: 100%;
        font-size: 25px;
        font-weight: bold;
        margin-top: 35px;
    }

    .title_h3 {
        font-size: 18px;
        font-weight: bold;
    }

    .color_login {
        background: #ffbd14;
        outline: none;
        border: none;
    }

    .reset {
        outline: none;
        border: none;
    }
</style>
