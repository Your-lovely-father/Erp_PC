import  Axios from '../../utils/request'

export  default {
    //客户列表 //查询
    reportList(page,offset){
        return Axios.post('/erp/get_client_report_list',{ page:page, offset:offset})
    },
    //客户删除
    reportDel(id){
        return Axios.post('/erp/client_report_del',{id:id})
    }


}
