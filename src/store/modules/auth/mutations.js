export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.currentUserId = payload.userId;
        state.autoLoggedOut = false;
    },
    autoLoggedout(state) {
        state.autoLoggedout = true;
    }
}