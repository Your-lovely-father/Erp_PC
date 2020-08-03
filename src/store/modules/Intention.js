import storage from "../../utils/localStorage";
export default {
    state: {
        isIntentionStatus: storage.get('isIntentionStatus'),
        addisIntention: storage.get('addisIntention').length === 0 ? 0 : 1,
        seeisIntention:storage.get('seeisIntention').length === 0 ? 0 : 1,
        updisIntention:storage.get('updisIntention').length === 0 ? 0 : 1,
        detailObj:storage.get('detailObj')
    },
    mutations: {
        isIntentionStatus: ((state, data) => {
            storage.set('isIntentionStatus', state.isIntentionStatus = data)
        }),
        addisIntention: ((state, data) => {
            storage.set('addisIntention', state.addisIntention = data)
        }),
        showIntention: ((state, data) => {
            storage.set('isIntentionStatus',state.isIntentionStatus=data)
        }),
        showIntentionStatus:((state,data)=>{
            storage.set('addisIntention',state.addisIntention=data);
            storage.remove('addisIntention')
        }),

        seeisIntention: ((state, data) => {
            storage.set('seeisIntention', state.seeisIntention = data)
        }),
        isIntention: ((state, data) => {
            storage.set('isIntentionStatus',state.isIntentionStatus=data)
        }),
        isSeeIntention:((state,data)=>{
            storage.set('seeisIntention',state.seeisIntention=data);
            storage.remove('seeisIntention');
            storage.remove('detailObj')
        }),

        updisIntention: ((state, data) => {
            storage.set('updisIntention', state.updisIntention = data)
        }),
        isUpdupdisIntention: ((state, data) => {
            storage.set('isIntentionStatus',state.isIntentionStatus=data)
        }),
        isUpdStatusupdisIntention:((state,data)=>{
            storage.set('updisIntention',state.updisIntention=data);
            storage.remove('updisIntention');
            storage.remove('detailObj')
        }),
        detailObj:((state,data)=>{
            storage.set('detailObj',state.detailObj=data);
        })
    },
}
