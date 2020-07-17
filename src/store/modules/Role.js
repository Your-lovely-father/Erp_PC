import storage from "../../utils/localStorage";
export default {
    state: {
        roleStatus: storage.get('roleStatus'),
        addSRole: storage.get('addSRole').length === 0 ? 0 : 1,
        seeRole: storage.get('seeRole').length === 0 ? 0 : 1,
        updRole:storage.get('updRole').length === 0 ? 0 : 1,
    },
    mutations: {
        roleStatus: ((state, data) => {
            storage.set('roleStatus', state.roleStatus = data)
        }),
        addSRole: ((state, data) => {
            storage.set('addSRole', state.addSRole = data)
        }),
        showRole: ((state, data) => {
            storage.set('roleStatus',state.roleStatus=data)
        }),
        showStatusRole:((state,data)=>{
            storage.set('addSRole',state.addSRole=data);
            storage.remove('addSRole')
        }),

        seeRole: ((state, data) => {
            storage.set('seeRole', state.seeRole = data)
        }),
        isRole: ((state, data) => {
            storage.set('roleStatus',state.roleStatus=data)
        }),
        isSeeRole:((state,data)=>{
            storage.set('seeRole',state.seeRole=data);
            storage.remove('seeRole')
        }),

        updRole: ((state, data) => {
            storage.set('updRole', state.updRole = data)
        }),
        isUpdRole: ((state, data) => {
            storage.set('roleStatus',state.roleStatus=data)
        }),
        isUpdStatusRole:((state,data)=>{
            storage.set('updRole',state.updRole=data);
            storage.remove('updRole')
        }),
    },
}
