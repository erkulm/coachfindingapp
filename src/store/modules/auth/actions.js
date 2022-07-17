let timer;
export default {
    async login(context, payload) {
        await authenticate(payload, context, 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAb2tXg5mExNDeWIFu7HEuijzsWSBQIntQ');
    },
    async signup(context, payload) {
        await authenticate(payload, context, 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAb2tXg5mExNDeWIFu7HEuijzsWSBQIntQ');
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        });
    },
    autoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = (+tokenExpiration - new Date().getTime());

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, 4000);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
            });
        }
    }
    ,autoLogout(context){
        context.commit('autoLoggedout');
        context.dispatch('logout');
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

    const expiresIn = responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + (expiresIn);

    localStorage.setItem('tokenExpiration', expirationDate);
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    timer = setTimeout(function () {
        context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
    });
}
