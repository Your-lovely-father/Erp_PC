import  Axios from '../../utils/request'

export  default {
    //  员工添加
    postAdd(user_name,user_phone,user_age,user_sex,user_id_card,user_password,user_status,user_role,
            province_id,city_id,area_id,storefront_id,mobile_terminal_status){
        console.log(user_name)
        console.log(user_phone)
        console.log(user_age)
        console.log(user_sex)
        console.log(user_id_card)
        console.log(user_password)
        console.log(user_status)
        console.log(user_role)
        console.log(province_id)
        console.log(city_id)
        console.log(area_id)
        console.log(storefront_id)
        console.log(mobile_terminal_status)
        return Axios.post("/erp/user_add",{user_name,user_phone,user_age,user_sex,user_id_card,user_password,user_status,user_role,province_id,city_id,area_id,storefront_id,mobile_terminal_status})
    }
}
