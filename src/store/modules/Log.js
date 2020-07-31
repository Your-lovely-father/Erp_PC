import storage from "../../utils/localStorage";
export default {
    state: {
        logStatus: storage.get('logStatus'),
        seeLog: storage.get('seeLog').length === 0 ? 0 : 1,
        area_id:'',
        storefront_id:'',
        user_id:'',
        start_time:'',
        end_time:'',
        detailObject:storage.get('detailObject'),
    },
    mutations: {
        logStatus: ((state, data) => {
            storage.set('logStatus', state.logStatus = data)
        }),
        seeLog: ((state, data) => {
            storage.set('seeLog', state.seeLog = data)
        }),
        isLog: ((state, data) => {
            storage.set('logStatus', state.logStatus = data);
        }),
        isSeeLog: ((state, data) => {
            storage.set('seeLog', state.seeLog = data);
            storage.remove('seeLog');
            storage.remove('detailObject')
        }),
        area_id:((state,data)=>{
            state.area_id=data
        }),
        storefront_id:((state,data)=>{
            state.storefront_id=data
        }),
        user_id:((state,data)=>{
            state.user_id=data
        }),
        start_time:((state,data)=>{
            state.start_time=data
        }),
        end_time:((state,data)=>{
            state.end_time=data
        }),
        //详情数据
        detailObject:((state,data)=>{
            storage.set('detailObject', state.detailObject = data);
        })

    },
}
