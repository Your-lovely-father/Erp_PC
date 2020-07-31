import Axios from '../../utils/request'

export default {
    //跟进列表
    trackingList(page, offset, area_id, storefront_id, user_name, start_time, end_time) {
        return Axios.post('/erp/get_follow_up_list', {
            page: page,
            offset: offset,
            area_id: area_id,
            storefront_id: storefront_id,
            user_name: user_name,
            start_time: start_time,
            end_time: end_time
        })
    },
    //删除
    trackingDel(id) {
        return Axios.post('/erp/follow_up_del', {id: id})
    },
    //跟进添加
    trackingAdd(record_content, client_id, user_id, area_id, storefront_id, follow_time) {
        return Axios.post('/erp/follow_up_add', {
            record_content: record_content,
            client_id: client_id,
            user_id: user_id,
            area_id: area_id,
            storefront_id: storefront_id,
            follow_time: follow_time
        })
    },
    //跟进详情
    detailList(id) {
        return Axios.post('/erp/follow_up_detail',{id:id})
    },
    //跟进修改
    trackingUpd(id,record_content,follow_time){
        return Axios.post('/erp/follow_up_edit',{id:id,record_content:record_content,follow_time:follow_time})
    }

}
