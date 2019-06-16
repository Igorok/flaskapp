let user = window.localStorage.getItem('user');
try {
    user = JSON.parse(user);
} catch (e) {
    console.log(e);
}

const initState = {
    id: user ? user.id : null,
    token: user ? user.token : null,
    login: user ? user.login : null,
    isAuthenticated: !! user,
    status: null,
    error: null,
};

const auth = (state = initState, action) => {
    let data = {...state};
    switch (action.type) {
        case 'AUTH_SEND':
            return {
                status: 'send',
            };
        case 'AUTH_SUCCESS':
            user = {...action.data.auth};
            window.localStorage.setItem('user', JSON.stringify(user));

            return {
                id: user.id,
                token: user.token,
                login: user.login,
                isAuthenticated: (user && user.id),
                status: 'success',
                error: null,
            }
        case 'AUTH_ERROR':
            window.localStorage.removeItem('user')
            return {
                status: 'error',
                error: action.error,
            };

        case 'LOGOUT_SEND':
            data.status = 'send';
            return data;
        case 'LOGOUT_SUCCESS':
            window.localStorage.removeItem('user');
            return {
                status: 'logout_success',
                error: null,
            }
        case 'LOGOUT_ERROR':
            window.localStorage.removeItem('user');
            return {
                status: 'error',
                error: action.error,
            };
            
        default:
            return state
    }
}

export default auth

