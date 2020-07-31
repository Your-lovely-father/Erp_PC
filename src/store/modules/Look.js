import storage from "../../utils/localStorage";
export default {
    state: {
        lookStatus: storage.get('lookStatus'),
        addLook: storage.get('addLook').length === 0 ? 0 : 1,
        seeLook: storage.get('seeLook').length === 0 ? 0 : 1,
        updLook:storage.get('updLook').length === 0 ? 0 : 1,
        area_id:'',
        storefront_id:'',
        user_id:'',
        client_id:'',
        start_time:'',
        end_time:'',
        detailList:storage.get('detailList')
    },
    mutations: {
        lookStatus: ((state, data) => {
            storage.set('lookStatus', state.lookStatus = data)
        }),
        addLook: ((state, data) => {
            storage.set('addLook', state.addLook = data)
        }),

        showLook: ((state, data) => {
            storage.set('lookStatus',state.lookStatus=data)
        }),
        showStatusLook:((state,data)=>{
            storage.set('addLook',state.addLook=data);
            storage.remove('addLook')
        }),

        seeLook: ((state, data) => {
            storage.set('seeLook', state.seeLook = data)
        }),
        isLook: ((state, data) => {
            storage.set('lookStatus',state.lookStatus=data)
        }),
        isSeeLook:((state,data)=>{
            storage.set('seeLook',state.seeLook=data);
            storage.remove('seeLook');
            storage.remove('detailList')
        }),

        updLook: ((state, data) => {
            storage.set('updLook', state.updLook = data)
        }),
        isUpdLook: ((state, data) => {
            storage.set('lookStatus',state.lookStatus=data)
        }),
        isUpdStatusLook:((state,data)=>{
            storage.set('updLook',state.updLook=data);
            storage.remove('updLook');
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
        client_id:((state,data)=>{
            state.client_id=data
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
