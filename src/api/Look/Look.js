import  Axios from '../../utils/request'

export default {
    //带看列表
    lookList(page,offset){
        return Axios.post('/erp/get_guide_look_list',{ page:page, offset:offset, })
    },
    //删除
    lookDel(id){
        return Axios.post('erp/guide_look_del',{id:id})
    }
}
