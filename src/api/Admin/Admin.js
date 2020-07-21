import  Axios from '../../utils/request'

export  default {
    //权限列表
    adminList(){
        return Axios.post('/erp/get_rule_list')
    }
}
