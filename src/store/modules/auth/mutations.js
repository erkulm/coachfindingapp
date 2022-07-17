export default{
    setUser(state, payload){
        state.token = payload.token;
        state.currentUserId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    }
}