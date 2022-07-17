export default {
    login() { },
    async signup() {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAb2tXg5mExNDeWIFu7HEuijzsWSBQIntQ', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const error = new Error(response.message || 'Authentication Failure');
            throw error;
        }

        const responseData = await response.json();

        context.commit('setUser', {
            token: responseData.token,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    }
}