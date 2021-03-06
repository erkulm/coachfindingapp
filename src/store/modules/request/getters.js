export default {
    requests(state, _1, _2, rootGetters) {
        const coachId = rootGetters.currentUserId;
        return state.requests.filter((r) => {
            if(r.coachId === coachId){
                return true;
            }
            return false;
        });
    },
    hasRequests(state, getters) {
        const requests = getters.requests;
        return requests && requests.length > 0;
    }
};