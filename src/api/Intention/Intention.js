import Axios from '../../utils/request'

export default {
    //意向楼盘列表
    intentionList(page,offset) {
        return Axios.post('/erp/get_intention_list',{page:page,offset:offset})
    },
    //楼盘删除
    intentionDel(id){
        return Axios.post('/erp/intention_del',{id:id})
    },
    //楼盘添加
    intentionAdd(client_id,user_id,building_id,area_id){
        return Axios.post('/erp/intention_add',{client_id:client_id,user_id:user_id,building_id:building_id,area_id:area_id})
    },
    //楼盘详情
    detailList(){
        return Axios.post('/erp/intention_detail',{id:id})
    },
    //楼盘修该
    intentionUpd(id,building_id,area_id){
        return Axios.post('/erp/intention_edit',{id:id,building_id:building_id,area_id:area_id})
    }
}
