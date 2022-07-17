export default {
    currentUserId(state) {
        return state.currentUserId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token;
    },
    isAutoLoggedout(state) {
        return state.autoLoggedout;
    }
}