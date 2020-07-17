import storage from "../../utils/localStorage";
export default {
    state: {
        logStatus: storage.get('logStatus'),
        seeLog: storage.get('seeLog').length === 0 ? 0 : 1,
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
    },
}
