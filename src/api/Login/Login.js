import Axios from '../../utils/request'

export  default {
    //登陆
    loginPost(username,password){
        return Axios.post('/erp/login',{username:username,password:password})
    },
    //退出
    outPost(){
        return Axios.post('/erp/login_out')
    },
    //修改密码
    upDpassPost(user_phone,order_password,new_password){
        return Axios.post('/erp/update_password',{user_phone:user_phone,order_password:order_password,new_password:new_password})
    }
}
