import storage from "../../utils/localStorage";
export default {
    state: {
        logStatus: storage.get('logStatus'),
        seeLog: storage.get('seeLog').length === 0 ? 0 : 1,
        logSeeObject:storage.get('logSeeObject') ||{}
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
        })
    },
}
