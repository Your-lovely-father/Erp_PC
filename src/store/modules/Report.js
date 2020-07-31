import storage from "../../utils/localStorage";
export default {
    state: {
        reportStatus: storage.get('reportStatus'),
        addStatus: storage.get('addStatus').length === 0 ? 0 : 1,
        seeStatus: storage.get('seeStatus').length === 0 ? 0 : 1,
        updStatus:storage.get('updStatus').length === 0 ? 0 : 1,
        detailList:storage.get('detailList')
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
            storage.remove('seeStatus');
            storage.remove('detailList')
        }),
        updStatus: ((state, data) => {
            storage.set('updStatus', state.updStatus = data)
        }),
        isUpd: ((state, data) => {
            storage.set('reportStatus',state.reportStatus=data);
        }),
        isUpdStatus:((state,data)=>{
            storage.set('updStatus',state.updStatus=data);
            storage.remove('updStatus');
            storage.remove('detailList')
        }),
        detailList:((state,data)=>{
            storage.set('detailList',state.detailList=data)
        })
    },
}
