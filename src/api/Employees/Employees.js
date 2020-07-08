import Axios from '../../utils/request'

export default {
    //  员工添加
    postAdd(user_name, user_phone, user_age, user_sex, user_id_card, user_password, user_status, user_role,
            province_id, city_id, area_id, storefront_id, mobile_terminal_status) {
        return Axios.post("/erp/user_add", {
            user_name: user_name,
            user_phone: user_phone,
            user_age: user_age,
            user_sex: user_sex,
            user_id_card: user_id_card,
            user_password: user_password,
            user_status: user_status,
            user_role: user_role,
            province_id: province_id,
            city_id: city_id,
            area_id: area_id,
            storefront_id: storefront_id,
            mobile_terminal_status: mobile_terminal_status
        })
    },
    //员工列表
    getSlectList(page, offset) {
        return Axios.get('erp/get_user_list?page=' + page + '&offset=' + offset)
    }

}
