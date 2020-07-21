import  Axios from '../../utils/request'

export  default {
    // 角色列表
    roleList(){
        return Axios.post('/erp/get_role_tree')
    },
    roleDel(id){
        return Axios.post('/erp/group_del',{id:id})
    }
}
