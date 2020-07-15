import storage from "../../utils/localStorage";
export default {
    state: {
        reportStatus: storage.get('reportStatus'),
        addStatus: storage.get('addStatus').length === 0 ? 0 : 1,
        seeStatus: storage.get('seeStatus').length === 0 ? 0 : 1,
        updStatus:storage.get('updStatus').length === 0 ? 0 : 1,
    },
    mutations: {
        reportStatus: ((state, data) => {
            storage.set('reportStatus', state.reportStatus = data)
        }),
        addStatus: ((state, data) => {
            storage.set('addStatus', state.addStatus = data)
        }),
        showReport: ((state, data) => {
            storage.set('reportStatus',state.reportStatus=data)
        }),
        showStatus:((state,data)=>{
            storage.set('addStatus',state.addStatus=data);
            storage.remove('addStatus')
        }),
        seeStatus: ((state, data) => {
            storage.set('seeStatus', state.seeStatus = data)
        }),
        isReport: ((state, data) => {
            storage.set('reportStatus',state.reportStatus=data)
        }),
        isSee:((state,data)=>{
            storage.set('seeStatus',state.seeStatus=data);
            storage.remove('seeStatus')
        }),
        updStatus: ((state, data) => {
            storage.set('updStatus', state.updStatus = data)
        }),
        isUpd: ((state, data) => {
            storage.set('reportStatus',state.reportStatus=data)
        }),
        isUpdStatus:((state,data)=>{
            storage.set('updStatus',state.updStatus=data);
            storage.remove('updStatus')
        }),
    },
}
