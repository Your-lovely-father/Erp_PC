import storage from "../../utils/localStorage";
export default {
    state: {
        trackingStatus: storage.get('trackingStatus'),
        addTracking: storage.get('addTracking').length === 0 ? 0 : 1,
        seeTracking: storage.get('seeTracking').length === 0 ? 0 : 1,
        updTracking:storage.get('updTracking').length === 0 ? 0 : 1,
        area_id:'',
        storefront_id:'',
        user_id:'',
        start_time:'',
        end_time:'',
        detailList:storage.get('detailList')
    },
    mutations: {
        trackingStatus: ((state, data) => {
            storage.set('trackingStatus', state.trackingStatus = data)
        }),
        addTracking: ((state, data) => {
            storage.set('addTracking', state.addTracking = data)
        }),

        showTracking: ((state, data) => {
            storage.set('trackingStatus',state.trackingStatus=data)
        }),
        showStatusTracking:((state,data)=>{
            storage.set('addTracking',state.addTracking=data);
            storage.remove('addTracking')
        }),

        seeTracking: ((state, data) => {
            storage.set('seeTracking', state.seeTracking = data)
        }),
        isTracking: ((state, data) => {
            storage.set('trackingStatus',state.trackingStatus=data)
        }),
        isSeeTracking:((state,data)=>{
            storage.set('seeTracking',state.seeTracking=data);
            storage.remove('seeTracking');
            storage.remove('detailList');
        }),
        updTracking: ((state, data) => {
            storage.set('updTracking', state.updTracking = data)
        }),
        isUpdTracking: ((state, data) => {
            storage.set('trackingStatus',state.trackingStatus=data)
        }),
        isUpdStatusTracking:((state,data)=>{
            storage.set('updTracking',state.updTracking=data);
            storage.remove('updTracking');
            storage.remove('detailList');
        }),
        area_id:((state,data)=>{
            state.area_id=data
        }),
        storefront_id:((state,data)=>{
            state.storefront_id=data
        }),
        user_id:((state,data)=>{
            state.user_id=data
        }),
        start_time:((state,data)=>{
            state.start_time=data
        }),
        end_time:((state,data)=>{
            state.end_time=data
        }),
        detailList:((state,data)=>{
            storage.set('detailList',state.detailList=data)
        })
    },
}
