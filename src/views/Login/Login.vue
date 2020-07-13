<template>
    <div class="login">
        <!--    logo区域    -->
        <div class="avatar_box">
            <img src="../../assets/images/logo.png" alt="">
        </div>
        <div class="login_box">
            <!--   title区域         -->
            <p class="title_h1">欢迎登陆 <span class="title_h3">可立刻新房源报备系统</span> </p>
            <!--    表单区        -->
            <el-form  :model="loginForm" class="login_form" :rules="rules" ref="loginFormRef">
            <!--    用户区   -->
                <el-form-item  prop="user">
                    <el-input v-model="loginForm.user" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
            <!--     密码区      -->
                <el-form-item  prop="pass">
                    <el-input v-model="loginForm.pass" prefix-icon="el-icon-s-release" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login(200)" class="color_login">登录</el-button>
                    <el-button type="info" @click="reset" class="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    user: 'admin',
                    pass: '123456'
                },
                rules:{
                    user: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            reset(){
                this.$refs.loginFormRef.resetFields()
            },
            login(val){
                this.$refs.loginFormRef.validate(value=>{
                   if(!value) return;
                    if(val===200){
                        this.$message.success('登录成功');
                        this.$router.push('/body');
                        window.sessionStorage.setItem('token',val);
                        return;
                    }else {
                        this.$message.error('登录失败');
                        return;
                    }
                })
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
        box-shadow:0px 0px 10px #eee;
        border: 1px #eee solid;
    }
    .avatar_box{
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
    .title_h1{
        text-align: center;
        width: 100%;
        font-size: 25px;
        font-weight: bold;
        margin-top: 35px;
    }
    .title_h3{
        font-size: 18px;
        font-weight: bold;
    }
    .color_login{
        background: #ffbd14;
        outline: none;
        border: none;
    }
    .reset{
        outline: none;
        border: none;
    }
</style>
