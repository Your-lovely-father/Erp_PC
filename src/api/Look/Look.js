import  Axios from '../../utils/request'

export default {
    //带看添加
    lookAdd(guide_look_content,client_id,user_id,area_id,storefront_id,building_id,look_time){
        return Axios.post('/erp/guide_look_add',{ guide_look_content:guide_look_content,client_id:client_id,user_id:user_id,area_id:area_id,storefront_id:storefront_id,building_id:building_id,look_time:look_time})
    },
    //带看列表
    lookList(page,offset,storefront_id,area_id,user_id,client_id,start_time,end_time){
        return Axios.post('/erp/get_guide_look_list',{ page:page, offset:offset,storefront_id:storefront_id,area_id:area_id,user_id:user_id,client_id:client_id,start_time:start_time,end_time:end_time })
    },
    //删除
    lookDel(id){
        return Axios.post('erp/guide_look_del',{id:id})
    },
    //获取全部客户
    clientList(page,offset){
        return Axios.post('/erp/get_client_list',{page:page,offset:offset})
    },
    //带看详情
    detailList(id){
        return Axios.post('/erp/guide_look_detail',{id:id})
    },
    //带看修改
    lookUpd(id,look_time,guide_look_content){
        return Axios.post('/erp/guide_look_edit',{ id:id,look_time:look_time,guide_look_content:guide_look_content})
    }
}
