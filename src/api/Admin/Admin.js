import  Axios from '../../utils/request'

export  default {
    //权限列表
    adminList(){
        return Axios.post('/erp/get_rule_list')
    },
    //权限添加
    adminAdd(pid,rule_name,rule_url,weight){
        return Axios.post('/erp/rule_add',{ pid:pid,rule_name:rule_name,rule_url:rule_url,weight:weight})
    },
    //权限删除
    adminDel(id){
        return Axios.post('/erp/rule_del',{id:id})
    },
    //权限详情
    detailObj(id){
        return Axios.post('/erp/rule_detail',{id:id})
    },
    //权限修改
    adminUpd(id,pid,rule_name,rule_url,weight){
        return Axios.post('/erp/rule_edit',{ id:id,pid:pid,rule_name:rule_name,rule_url:rule_url,weight:weight})
    }
}
