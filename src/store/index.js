import Vue from 'vue'
import Vuex from 'vuex'
import report from './modules/Report'
import building from './modules/Building'
import intention from './modules/Intention'
import stores from './modules/Stores'
import log from './modules/Log'
import look from './modules/Look'
import tracking from './modules/Tracking'
import employees from './modules/Employees'
import role from './modules/Role'
import admin from './modules/Admin'
import storage from "../utils/localStorage";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        access_token:storage.get('access_token').length === 0 ? '': storage.get('access_token'),
        navigation:storage.get('navigation'),
        reluAdus:storage.get('reluAdus'),
        imgAge:storage.get('imgAge')
    },
    mutations: {
        token: ((state, data) => {
            storage.set('access_token',state.access_token=data)
        }),
        navigation:((state,data)=>{
            storage.set('navigation',state.navigation=data)
        }),
        reluAdus:((state,data)=>{
            storage.set('reluAdus',state.reluAdus=data)
        }),
        imgAge:((state,data)=>{
            storage.set('imgAge',state.imgAge=data)
        })
    },
    actions: {},
    getters: {},
    modules: {
        report,
        building,
        intention,
        stores,
        log,
        look,
        tracking,
        employees,
        role,
        admin,
    }
})
