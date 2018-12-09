let initState = {
    userId: window.localParams.userId ? parseInt(window.localParams.userId) : null,
    start: window.localParams.start ? parseInt(window.localParams.start) : 0,
    perpage: window.localParams.perpage ? parseInt(window.localParams.perpage) : 9,
    users: [],
    count: 0,
    status: null,
    error: null,
};
const userList = (state = initState, action) => {
    let data = {...state};
    switch (action.type) {
        case 'USER_LIST_SEND':
            data.start = action.start;
            data.status = 'send';
            return data;
        case 'USER_LIST_SUCCESS':
            data.status = 'success';
            data.users = action.data.getUserList.users;
            data.count = action.data.getUserList.count;
            return data;
        case 'USER_LIST_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;



        case 'FRIEND_REQUEST_SEND':
            // data.start = action.start;
            data.status = 'send';
            return data;
        case 'FRIEND_REQUEST_SUCCESS':
            data.status = 'success';
            // data.users = action.data.getUserList.users;
            // data.count = action.data.getUserList.count;
            return data;
        case 'FRIEND_REQUEST_ERROR':
            data.status = 'error';
            // data.error = action.error;
            return data;


        default:
            return state
    }
}

export default userList