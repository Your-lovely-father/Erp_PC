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
                          <p class="el-icon-close"></p>
                      </div>
                  </div>
               </div>
               <div class="content_form">
                   <div class="int_box">
                       <span>旧密码</span>
                       <el-input v-model="password" placeholder="请输入旧密码" class="int"></el-input>
                   </div>
                   <div class="int_box">
                       <span>新密码</span>
                       <el-input v-model="newpass" placeholder="请输入新密码" class="int"></el-input>
                   </div>
                   <div class="int_box">
                       <span>新密码</span>
                       <el-input v-model="newpassword" placeholder="请输入新密码" class="int"></el-input>
                   </div>
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
        name: "See",
        props: {
            isShowPassword: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                password:'',
                newpass:'',
                newpassword:'',

            }
        },
        methods: {
            cancel() {
                this.$emit("update:isShowPassword", false);
            },
            confirm() {
                this.$emit("update:isShowPassword", false);
            }
        },
        created() {
            this.list = JSON.parse(this.isShowPassword);
        }
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
        width: 500px;
        height: 400px;
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
        width: 93%;
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
        padding: 30px 0;
    }
    .content_form{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .int{
        width: 300px;
    }
    .int_box{
        margin-top: 45px;
    }
    .int_box>span{
        padding-right:20px;
    }
</style>
