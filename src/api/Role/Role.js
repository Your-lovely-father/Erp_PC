import  Axios from '../../utils/request'

export  default {
    // 角色列表
    roleList(){
        return Axios.post('/erp/get_role_tree')
    },
    //角色删除
    roleDel(id){
        return Axios.post('/erp/group_del',{id:id})
    },
    //角色添加
    releAdd(pid,group_name,rule_ids){
        return Axios.post('/erp/group_add',{pid:pid,group_name:group_name,rule_ids:rule_ids})
    },
    //角色详情
   detailObj(id){
        return Axios.post('/erp/group_detail',{id:id})
    },
    //角色修改
    releUpd(id,pid,group_name,rule_ids){
        return Axios.post('/erp/group_edit',{ id:id,pid:pid,group_name:group_name,rule_ids:rule_ids})
    }
}
