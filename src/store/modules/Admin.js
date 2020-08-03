import storage from "../../utils/localStorage";
export default {
    state: {
        adminStatus: storage.get('adminStatus'),
        addAdmin: storage.get('addAdmin').length === 0 ? 0 : 1,
        seeAdmin: storage.get('seeAdmin').length === 0 ? 0 : 1,
        updAdmin:storage.get('updAdmin').length === 0 ? 0 : 1,
        detailObj:storage.get('detailObj')
    },
    mutations: {
        adminStatus: ((state, data) => {
            storage.set('adminStatus', state.adminStatus = data)
        }),
        addAdmin: ((state, data) => {
            storage.set('addAdmin', state.addAdmin = data)
        }),
        showAdmin: ((state, data) => {
            storage.set('adminStatus',state.adminStatus=data)
        }),
        showStatusAdmin:((state,data)=>{
            storage.set('addAdmin',state.addAdmin=data);
            storage.remove('addAdmin')
        }),

        seeAdmin: ((state, data) => {
            storage.set('seeAdmin', state.seeAdmin = data)
        }),
        isAdmin: ((state, data) => {
            storage.set('adminStatus',state.adminStatus=data)
        }),
        isSeeAdmin:((state,data)=>{
            storage.set('seeAdmin',state.seeAdmin=data);
            storage.remove('seeAdmin');
            storage.remove('detailObj')
        }),

        updAdmin: ((state, data) => {
            storage.set('updAdmin', state.updAdmin = data)
        }),
        isUpdAdmin: ((state, data) => {
            storage.set('adminStatus',state.adminStatus=data)
        }),
        isUpdStatusAdmin:((state,data)=>{
            storage.set('updAdmin',state.updAdmin=data);
            storage.remove('updAdmin');
            storage.remove('detailObj')
        }),
        detailObj:((state,data)=>{
            storage.set('detailObj',state.detailObj=data);
        })
    },
}
