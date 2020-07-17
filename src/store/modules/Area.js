import storage from "../../utils/localStorage";
export default {
    state: {
        AreaStatus: storage.get('AreaStatus'),
        addArea: storage.get('addArea').length === 0 ? 0 : 1,
        updArea:storage.get('updArea').length === 0 ? 0 : 1,
    },
    mutations: {
        AreaStatus: ((state, data) => {
            storage.set('AreaStatus', state.AreaStatus = data)
        }),
        addArea: ((state, data) => {
            storage.set('addArea', state.addArea = data)
        }),
        showArea: ((state, data) => {
            storage.set('AreaStatus',state.AreaStatus=data)
        }),
        showAreaStatus:((state,data)=>{
            storage.set('addArea',state.addArea=data);
            storage.remove('addArea')
        }),

        updStatusArea: ((state, data) => {
            storage.set('updArea', state.updArea = data)
        }),
        isUpdArea: ((state, data) => {
            storage.set('AreaStatus',state.AreaStatus=data)
        }),
        isUpdStatusArea:((state,data)=>{
            storage.set('updArea',state.updArea=data);
            storage.remove('updArea')
        }),

    },
}
