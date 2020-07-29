import storage from "../../utils/localStorage";
export default {
    state: {
        logStatus: storage.get('logStatus'),
        seeLog: storage.get('seeLog').length === 0 ? 0 : 1,
        logSeeObject:storage.get('logSeeObject') ||{},
        area_id:'',
        storefront_id:'',
        user_id:'',
        start_time:'',
        end_time:''
    },
    mutations: {
        logStatus: ((state, data) => {
            storage.set('logStatus', state.logStatus = data)
        }),
        seeLog: ((state, data) => {
            storage.set('seeLog', state.seeLog = data)
        }),
        isLog: ((state, data) => {
            storage.set('logStatus', state.logStatus = data)
        }),
        isSeeLog: ((state, data) => {
            storage.set('seeLog', state.seeLog = data);
            storage.remove('seeLog')
        }),
        //日志查看数据
        logSeeObject:((state,data)=>{
            storage.set('logSeeObject', state.logSeeObject = data);
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
        })
    },
}
