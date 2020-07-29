import  Axios from '../../utils/request'

export  default {
    // 日志查询
    logSee(page,offset,area_id,storefront_id,user_name,start_time,end_time){
        return Axios.post('/erp/get_log_list',{ page:page, offset:offset,area_id:area_id,storefront_id:storefront_id,user_name:user_name,start_time:start_time,end_time:end_time })
    },
    //日志删除
    logDel(id){
        return Axios.post('/erp/del_log',{ id:id})
    },
    //日志详情
    logDetail(id) {
        return Axios.post('/erp/get_log_detail',{id:id})
    }
}
