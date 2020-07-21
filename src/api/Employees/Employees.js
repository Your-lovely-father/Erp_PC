import Axios from '../../utils/request'

export default {
    //  员工添加
    postAdd(user_name,
            user_phone,
            user_age,
            user_sex,
            user_id_card,
            user_password,
            user_role,
            province_id,
            city_id,
            area_id,
            storefront_id,
            user_status,
            mobile_terminal_status) {
        return Axios.post("/erp/user_add", {
            user_name: user_name,
            user_phone: user_phone,
            user_age: user_age,
            user_sex: user_sex,
            user_id_card: user_id_card,
            user_password: user_password,
            user_role: user_role,
            province_id: province_id,
            city_id: city_id,
            area_id: area_id,
            storefront_id: storefront_id,
            user_status: user_status,
            mobile_terminal_status: mobile_terminal_status
        })
    },
    //角色
    postRole(){
        return Axios.post('/erp/get_role_tree')
    },
    //员工列表
    getSlectList(pageInfo) {
        return Axios.post('erp/get_user_list',{page:pageInfo.pagenum,offset:pageInfo.pagesize})
    },
    //员工删除
    postDel(id){
        return Axios.post('/erp/user_del',{id:id})
    },
    //员工详情
    postSee(id){
        return Axios.post('erp/user_detail',{id:id})
    },

    //员工修改
    postUpd(
        id=selectUpd.id,
        user_name=selectUpd.user_name,
        user_sex=selectUpd.user_sex,
        user_phone=selectUpd.user_phone,
        user_age=selectUpd.user_age,
        user_id_card=selectUpd.user_id_card,
        user_status=selectUpd.user_status,
        user_role,
        area_id=selectUpd.area_id,
        storefront_id=selectUpd.storefront_id,
        mobile_terminal_status=selectUpd.mobile_terminal_status

    ){
        return Axios.post('/erp/user_edit',{id:id,user_name:user_name,user_sex:user_sex,user_phone:user_phone,user_age:user_age,user_id_card:user_id_card,
            user_status:user_status,user_role:user_role,area_id:area_id,storefront_id:storefront_id, mobile_terminal_status: mobile_terminal_status})
    }
}
