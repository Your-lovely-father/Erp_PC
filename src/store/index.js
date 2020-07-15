import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/localStorage'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        reportStatus:storage.get('reportStatus'),
        addStatus:storage.get('addStatus')
    },
    mutations: {
        reportStatus: ((state,data) => {
            console.log(data);
            storage.set('reportStatus', state.reportStatus=data)
        }),
        addStatus:((state,data)=>{
            storage.set('addStatus', state.addStatus=data)
        })
    },
    actions: {},
    getters: {},
    modules: {}
})
