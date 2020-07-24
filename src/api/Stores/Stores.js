import  Axios from '../../utils/request'

export default{
    //门店管理添加
    storesAdd(storefront_name,province_id,city_id,area_id){
        return Axios.post('/erp/storefront_add',{storefront_name:storefront_name, province_id:province_id, city_id:city_id, area_id:area_id })
    },
    //门店列表
    storesSee(page,offset,province_id,city_id,area_id){
        console.log(page)
        return Axios.post('/erp/get_storefront_list',{ page:page, offset:offset, province_id:province_id, city_id:city_id, area_id:area_id})
    },
    // //搜索
    // storesSearch(page,offset ,province_id,city_id,area_id){
    //     return Axios.post('/erp/get_storefront_list',{ page:page, offset:offset, province_id:province_id, city_id:city_id, area_id:area_id})
    // },
    //门店删除
    storesDel(id){
        return Axios.post('/erp/storefront_del',{ id:id})
    },
    //门店详情
    storesDetails(id){
        return Axios.post('/erp/storefront_detail',{id:id})
    }

    //修改
}
