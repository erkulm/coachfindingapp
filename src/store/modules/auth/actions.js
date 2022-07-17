export default {
    async login(context, payload) {
        await authenticate(payload, context, 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAb2tXg5mExNDeWIFu7HEuijzsWSBQIntQ');
    },
    async signup(context, payload) {
        await authenticate(payload, context, 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAb2tXg5mExNDeWIFu7HEuijzsWSBQIntQ');
    }
}

async function authenticate(payload, context, url) {
    const response = await fetch(url, {
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
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
    });
}
