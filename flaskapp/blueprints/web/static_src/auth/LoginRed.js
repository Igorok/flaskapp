let user = localStorage.getItem('user');
if (user) user = JSON.parse(user);

const initState = {
    id: user ? user.id : null,
    token: user ? user.token : null,
    login: user ? user.login : null,
    isAuthenticated: !! user,
    status: null,
    error: null,
};


const success = (state, action) => {
    user = {...action.data.auth};
    localStorage.setItem('user', JSON.stringify(user));
    return {
        id: user.id,
        token: user.token,
        login: user.login,
        isAuthenticated: (user && user.id),
        status: 'success',
        error: null,
    }
}


const auth = (state = initState, action) => {
    switch (action.type) {
        case 'AUTH_SEND':
            return {
                status: 'send',
            };
        case 'AUTH_SUCCESS':
            return success(state, action);
        case 'AUTH_ERROR':
            localStorage.removeItem('user')
            return {
                status: 'error',
                error: action.error,
            };
        default:
            return state
    }
}

export default auth

