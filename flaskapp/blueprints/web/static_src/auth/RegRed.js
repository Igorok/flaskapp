const initState = {
    login: null,
    password: null,
    confirmPassword: null,
    status: null,
    error: null,
};

const registration = (state = initState, action) => {
    let data = {...state};
    switch (action.type) {
        case 'REG_SEND':
            data.status = 'send';
            return data;
        case 'REG_SUCCESS':
            data.status = 'success';
            return data;
        case 'REG_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;
        default:
            return state
    }
}

export default registration

