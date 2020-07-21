import  Axios from '../../utils/request'

export  default {
    // 日志查询
    logSee(page,offset){
        return Axios.post('/erp/get_log_list',{ page:page, offset:offset })
    },
    //日志删除
    logDel(id){
        return Axios.post('/erp/del_log',{ id:id})
    }
}
