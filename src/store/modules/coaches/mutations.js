export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
        state.isCoach = true;
        state.currentUserId = payload.id;
    },
    setCoaches(state, payload) {
        state.coaches = payload;
    }
}