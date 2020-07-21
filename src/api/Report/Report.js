import  Axios from '../../utils/request'

export  default {
    //客户列表 //查询
    reportList(page,offset,start_time,end_time,building_id,client_name,client_phone,area_id,storefront_id,user_id,client_type){
        return Axios.post('/erp/get_client_report_list',{ page:page, offset:offset,start_time:start_time,end_time:end_time,building_id:building_id,client_name:client_name,client_phone:client_phone,area_id:area_id,storefront_id:storefront_id,user_id:user_id,client_type:client_type})
    },
    //客户删除
    reportDel(id){
        return Axios.post('/erp/client_report_del',{id:id})
    },
    //客户添加
    reportAdd( client_name,client_phone,reported_time,user_id,province_id,city_id,area_id,storefront_id,remarks,client_type){
        return Axios.post('/erp/client_report_add',{client_name:client_name,client_phone:client_phone,reported_time:reported_time,user_id:user_id,province_id:province_id,city_id:city_id,area_id:area_id,storefront_id:storefront_id,remarks:remarks,client_type:client_type})
    },
    //客户类别
    categoryList(page, offset, ){
        return Axios.post('/erp/get_client_type_list',{page:page,offset:offset})
    },
    //员工列表
    getSlectList(page,offset,province_id,city_id,area_id,storefront_id) {
        return Axios.post('erp/get_user_list',{page:page,offset:offset,province_id,city_id,area_id,storefront_id})
    },
    //楼盘列表
    buildingList(page,offset,province_id,city_id,area_id){
        return Axios.post('/erp/get_building_list',{page:page,offset:offset,province_id:province_id,city_id:city_id,area_id:area_id})
    },
    //客户详情
    detailObject(id){
        return Axios.post('/erp/client_report_detail',{id:id})
    },
    //带看管理列表
    lookList(page,offset,storefront_id,area_id,user_id){
        return Axios.post('/erp/get_guide_look_list',{page:page,offset:offset,storefront_id:storefront_id,area_id:area_id,user_id:user_id})
    }


}
