/**
 * @Description: 通用接口
 * @author ZhiYuanWang
 * @date 2020/6/15 13:25
*/
import axios from '../../utils/request';

export default {
    //三级联动
    getSelect(){
        return axios.get('/erp/area_list')
    },
    //门店
    postStores(){
        return axios.post('/erp/get_storefront_list',{page:1,offset:2})
    }
}
