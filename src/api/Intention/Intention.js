import Axios from '../../utils/request'

export default {
    //意向楼盘列表
    intentionList(page,offset,client_id,province_id,city_id,area_id,client_name) {
        return Axios.post('/erp/get_intention_list',{page:page,offset:offset,client_id:client_id,province_id:province_id,city_id:city_id,area_id:area_id,client_name:client_name})
    },
    //楼盘删除
    intentionDel(id){
        return Axios.post('/erp/intention_del',{id:id})
    },
    //楼盘添加
    intentionAdd(client_id,user_id,building_id,province_id,city_id,area_id){
        return Axios.post('/erp/intention_add',{client_id:client_id,user_id:user_id,building_id:building_id,province_id:province_id,city_id:city_id,area_id:area_id})
    },
    //楼盘详情
    detailList(id){
        return Axios.post('/erp/intention_detail',{id:id})
    },
    //楼盘修该
    intentionUpd(id,building_id,province_id,city_id,area_id){
        return Axios.post('/erp/intention_edit',{id:id,building_id:building_id,province_id,city_id,area_id})
    },
    //添加意向楼盘客户信息
    intentionSelect(area_id){
        return Axios.post('/erp/intention_add_where',{area_id:area_id})
    }
}
