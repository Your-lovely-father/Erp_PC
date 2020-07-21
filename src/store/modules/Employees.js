import storage from "../../utils/localStorage";
export default {
    state: {
        employeesStatus: storage.get('employeesStatus'),
        addEmployees: storage.get('addEmployees').length === 0 ? 0 : 1,
        seeEmployees: storage.get('seeEmployees').length === 0 ? 0 : 1,
        updEmployees:storage.get('updEmployees').length === 0 ? 0 : 1,
        selectSee:storage.get('selectSee')||{},
        selectUpd:storage.get('selectUpd')||{}
    },
    mutations: {
        employeesStatus: ((state, data) => {
            storage.set('employeesStatus', state.employeesStatus = data)
        }),
        addEmployees: ((state, data) => {
            storage.set('addEmployees', state.addEmployees = data)
        }),

        showEmployees: ((state, data) => {
            storage.set('employeesStatus',state.employeesStatus=data)
        }),
        showStatusEmployees:((state,data)=>{
            storage.set('addEmployees',state.addEmployees=data);
            storage.remove('addEmployees')
        }),
        seeEmployees: ((state, data) => {
            storage.set('seeEmployees', state.seeEmployees = data)
        }),
        isEmployees: ((state, data) => {
            storage.set('employeesStatus',state.employeesStatus=data)
        }),
        isSeeEmployees:((state,data)=>{
            storage.set('seeEmployees',state.seeEmployees=data);
            storage.remove('seeEmployees')
        }),


        updEmployees: ((state, data) => {
            storage.set('updEmployees', state.updEmployees = data)
        }),
        isUpdEmployees: ((state, data) => {
            storage.set('employeesStatus',state.employeesStatus=data)
        }),
        isUpdStatusEmployees:((state,data)=>{
            storage.set('updEmployees',state.updEmployees=data);
            storage.remove('updEmployees')
        }),

        //员工详情
        selectSee:((state,data)=>{
            console.log(data);
            storage.set('selectSee',state.selectSee=data)
        }),
        // 修改回显数据
        selectUpd:((state,data)=>{
            storage.set('selectUpd',state.selectUpd=data)
        })
    },
}
