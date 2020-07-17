import storage from "../../utils/localStorage";
export default {
    state: {
        lookStatus: storage.get('lookStatus'),
        addLook: storage.get('addLook').length === 0 ? 0 : 1,
        seeLook: storage.get('seeLook').length === 0 ? 0 : 1,
        updLook:storage.get('updStatus').length === 0 ? 0 : 1,
    },
    mutations: {
        lookStatus: ((state, data) => {
            storage.set('lookStatus', state.lookStatus = data)
        }),
        addLook: ((state, data) => {
            storage.set('addStatus', state.addLook = data)
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
            storage.remove('seeLook')
        }),

        updLook: ((state, data) => {
            storage.set('updLook', state.updLook = data)
        }),
        isUpdLook: ((state, data) => {
            storage.set('lookStatus',state.lookStatus=data)
        }),
        isUpdStatusLook:((state,data)=>{
            storage.set('updLook',state.updLook=data);
            storage.remove('updLook')
        }),
    },
}
