import Vue from 'vue'
import Vuex from 'vuex'
import report from './modules/Report'
import building from './modules/Building'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        report,
        building
    }
})
