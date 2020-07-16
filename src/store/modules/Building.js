import storage from "../../utils/localStorage";
export default {
    state: {
        buildingStatus: storage.get('buildingStatus'),
        addBuiding: storage.get('addBuiding').length === 0 ? 0 : 1,
        // seeBuiding: storage.get('seeStatus').length === 0 ? 0 : 1,
        // updBuiding:storage.get('updStatus').length === 0 ? 0 : 1,
    },
    mutations: {
        buildingStatus: ((state, data) => {
            storage.set('buildingStatus', state.buildingStatus = data)
        }),
        addBuiding: ((state, data) => {
            storage.set('addBuiding', state.addBuiding = data)
        }),
        showReport: ((state, data) => {
            storage.set('buildingStatus',state.buildingStatus=data)
        }),
        showStatus:((state,data)=>{
            storage.set('addBuiding',state.addBuiding=data);
            storage.remove('addBuiding')
        }),
        // seeStatus: ((state, data) => {
        //     storage.set('seeStatus', state.seeStatus = data)
        // }),
        // isReport: ((state, data) => {
        //     storage.set('reportStatus',state.reportStatus=data)
        // }),
        // isSee:((state,data)=>{
        //     storage.set('seeStatus',state.seeStatus=data);
        //     storage.remove('seeStatus')
        // }),
        // updStatus: ((state, data) => {
        //     storage.set('updStatus', state.updStatus = data)
        // }),
        // isUpd: ((state, data) => {
        //     storage.set('reportStatus',state.reportStatus=data)
        // }),
        // isUpdStatus:((state,data)=>{
        //     storage.set('updStatus',state.updStatus=data);
        //     storage.remove('updStatus')
        // }),

    },
}
