import Axios from '../../utils/request'

export default {
    // 楼盘列表
    buildingList( page, offset){
        return Axios.post('/erp/get_building_list',{ page:page, offset:offset})
    },
    //楼盘删除
    reportDel(id){
        return Axios.post('/erp/building_del',{id:id})
    }
}

