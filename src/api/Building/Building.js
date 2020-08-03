import Axios from '../../utils/request'

export default {
    // 楼盘列表
    buildingList( page, offset){
        return Axios.post('/erp/get_building_list',{ page:page, offset:offset})
    },
    //楼盘删除
    reportDel(id){
        return Axios.post('/erp/building_del',{id:id})
    },
    //楼盘添加
    reportAdd(
        building_name,
        building_nickname,
        building_abbreviation,
        building_address,
        average_unit_price_begin,
        average_unit_price_end,
        opening_time,
        overall_floorage,
        green_area,
        province_id,
        city_id,
        area_id,
        building_image,
        building_floor,
    ){
        return Axios.post('/erp/building_add',{
            building_name:building_name,
            building_nickname:building_nickname,
            building_abbreviation:building_abbreviation,
            building_address:building_address,
            average_unit_price_begin:average_unit_price_begin,
            average_unit_price_end:average_unit_price_end,
            opening_time:opening_time,
            overall_floorage:overall_floorage,
            green_area:green_area,
            province_id:province_id,
            city_id:city_id,
            area_id:area_id,
            building_image:building_image,
            building_floor:building_floor,
        })
    },
    //楼盘详情
    detailObject(id){
        return Axios.post('/erp/building_detail',{id:id})
    },
    //楼盘修改
    reportUpd(
        id,
        building_name,
        building_nickname,
        building_abbreviation,
        building_address,
        average_unit_price_begin,
        average_unit_price_end,
        opening_time,
        overall_floorage,
        green_area,
        province_id,
        city_id,
        area_id,
        building_image,
        building_floor

    ){
        return Axios.post('/erp/building_edit',{
        id:id,
        building_name:building_name,
        building_nickname:building_nickname,
        building_abbreviation:building_abbreviation,
        building_address:building_address,
        average_unit_price_begin:average_unit_price_begin,
        average_unit_price_end:average_unit_price_end,
        opening_time:opening_time,
        overall_floorage:overall_floorage,
        green_area:green_area,
        province_id:province_id,
        city_id:city_id,
        area_id:area_id,
        building_image:building_image,
        building_floor:building_floor
        })
    }
}

