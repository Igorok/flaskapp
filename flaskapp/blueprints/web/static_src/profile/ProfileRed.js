let initState = {
    id: '',
    login: '',
    email: '',
    friends: '',
    friendRequests: 0,
    selfFriendRequests: 0,
    countChats: 0,
    countBlogs: 0,
    status: null,
    error: null,
};
const profile = (state = initState, action) => {
    let data = null;
    

    switch (action.type) {
        case 'PROFILE_SEND':
            let sendState = {...state};
            sendState.status = 'send';
            return sendState;
        case 'PROFILE_SUCCESS':
            data = {...action.data.profile};
            return {
                _id: data._id,
                login: data.login,
                email: data.email,
                friends: data.friends || 0,
                friendRequests: data.friendRequests || 0,
                selfFriendRequests: data.selfFriendRequests || 0,
                countChats: data.countChats || 0,
                countBlogs: data.countBlogs || 0,
                status: 'success',
                error: null,
            };
        case 'PROFILE_ERROR':
            let errorState = {...state};
            errorState.status = 'error';
            errorState.error = action.error;
            return errorState;
        
        case 'PROFILE_EDIT_SEND':
            state = {...state};
            state.login = action.login;
            state.email = action.email;
            state.status = 'send';
            return state;
        case 'PROFILE_EDIT_SUCCESS':
            data = {...action.data.editProfile};
            state = {...state};
            state.login = data.login;
            state.email = data.email;
            state.status = 'edit_success';
            state.error = null;
            return state;
        case 'PROFILE_EDIT_ERROR':
            state = {...state};
            state.status = 'edit_error';
            state.error = action.error;
            return state;
        default:
            return state
    }
}

export default profile