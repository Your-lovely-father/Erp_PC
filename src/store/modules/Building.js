import storage from "../../utils/localStorage";
export default {
    state: {
        buildingStatus: storage.get('buildingStatus'),
        addBuiding: storage.get('addBuiding').length === 0 ? 0 : 1,
        seeBuiding: storage.get('seeBuiding').length === 0 ? 0 : 1,
        updBuiding:storage.get('updBuiding').length === 0 ? 0 : 1,
        detailObj:storage.get('detailObj')
    },
    mutations: {
        buildingStatus: ((state, data) => {
            storage.set('buildingStatus', state.buildingStatus = data)
        }),
        addBuiding: ((state, data) => {
            storage.set('addBuiding', state.addBuiding = data)
        }),

        showBuilding: ((state, data) => {
            storage.set('buildingStatus',state.buildingStatus=data)
        }),
        showBuildingaStatus:((state,data)=>{
            storage.set('addBuiding',state.addBuiding=data);
            storage.remove('addBuiding')
        }),

        seeStatusBuilding: ((state, data) => {
            storage.set('seeBuiding', state.seeBuiding = data)
        }),
        isBuilding: ((state, data) => {
            storage.set('buildingStatus',state.buildingStatus=data)
        }),
        isSeeBuilding:((state,data)=>{
            storage.set('seeBuiding',state.seeBuiding=data);
            storage.remove('seeBuiding');
            storage.remove('detailObj')
        }),

        updStatusBuilding: ((state, data) => {
            storage.set('updBuiding', state.updBuiding = data)
        }),
        isBuildingUpd: ((state, data) => {
            storage.set('buildingStatus',state.buildingStatus=data)
        }),
        isBuildingUpdStatus:((state,data)=>{
            storage.set('updBuiding',state.updBuiding=data);
            storage.remove('updBuiding');
            storage.remove('detailObj')
        }),
        detailObj:((state,data)=>{
            storage.set('detailObj',state.detailObj=data);
        })
    },
}
