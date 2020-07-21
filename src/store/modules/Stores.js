import storage from "../../utils/localStorage";
export default {
    state: {
        storesStatus: storage.get('storesStatus'),
        addstores: storage.get('addstores').length === 0 ? 0 : 1,
        updstores:storage.get('updstores').length === 0 ? 0 : 1,
        modifySee:storage.get('modifySee') || {},
        province_id:'',
        city_id:'',
        area_id:'',


    },
    mutations: {
        storesStatus: ((state, data) => {
            storage.set('storesStatus', state.storesStatus = data)
        }),
        addstores: ((state, data) => {
            storage.set('addstores', state.addstores = data)
        }),
        showstores: ((state, data) => {
            storage.set('storesStatus',state.storesStatus=data)
        }),
        showstoresStatus:((state,data)=>{
            storage.set('addstores',state.addstores=data);
            storage.remove('addstores')
        }),
        updStores: ((state, data) => {
            storage.set('updstores', state.updstores = data)
        }),
        isUpdStores: ((state, data) => {
            storage.set('storesStatus',state.storesStatus=data)
        }),
        isUpdStatusStores:((state,data)=>{
            storage.set('updstores',state.updstores=data);
            storage.remove('updstores')
        }),
        province_id:((state,data)=>{
            state.province_id=data
        }),
        city_id:((state,data)=>{
            state.city_id=data
        }),
        area_id:((state,data)=>{
            state.area_id=data
        }),
        modifySee:((state,data)=>{
            storage.set('modifySee',state.modifySee=data)
        }),
    },
}
