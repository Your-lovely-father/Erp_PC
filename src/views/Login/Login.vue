<template>
    <div class="login">
        <div class="login_box">
            <!--    头像区        -->
            <div class="avatar_box">
                <img src="../../assets/images/logo-ip.png" alt="">
            </div>
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
                    <el-button type="primary" @click="login(200)">登录</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
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
        background-color: #2b4b6b;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
    }

    .avatar_box > img {
        width: 100%;
        height: 130px;
        border-radius: 50%;
        background-color: #eee;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>
