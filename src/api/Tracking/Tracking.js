import  Axios from '../../utils/request'

export default {
    //跟进列表
    trackingList(page,offset){
        return Axios.post('/erp/get_follow_up_list',{ page:page, offset:offset })
    },
    //删除
    trackingDel(id){
        return Axios.post('/erp/follow_up_del',{ id:id})
    }
}
