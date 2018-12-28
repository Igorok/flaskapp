



import {forEach} from 'lodash';
let initState = {
    start: window.localParams.start ? parseInt(window.localParams.start) : 0,
    perpage: window.localParams.perpage ? parseInt(window.localParams.perpage) : 9,
    friends: [],
    count: 0,
    status: null,
    error: null,
};




const friendList = (state = initState, action) => {

    let data = {...state};
    switch (action.type) {
        case 'FRIEND_LIST_SEND':
            data.start = action.start;
            data.status = 'send';
            return data;
        case 'FRIEND_LIST_SUCCESS':
            data.status = 'success';
            data.friends = action.data.getUserList.friends;
            data.count = action.data.getUserList.count;
            return data;
        case 'FRIEND_LIST_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;

        /*
        case 'FRIEND_REQUEST_SEND':
            data.status = 'send';
            return data;
        case 'FRIEND_REQUEST_SUCCESS':
            data.status = 'success';
            forEach(data.users, u => {
                if (parseInt(u.id) == action.data.friendRequest.friendId) {
                    u.friendUserId = action.data.friendRequest.userId
                }
            });
            return data;
        case 'FRIEND_REQUEST_ERROR':
            data.status = 'error';
            return data;
        */
        case 'FRIEND_REMOVE_SEND':
            data.status = 'send';
            return data;
        case 'FRIEND_REMOVE_SUCCESS':
            data.status = 'success';
            /*
            forEach(data.friends, u => {
                if (parseInt(u.id) == action.data.friendRemove.friendId) {
                    u.friendUserId = null;
                }
            });
            */

            return data;
        case 'FRIEND_REMOVE_ERROR':
            data.status = 'error';
            return data;
            
        default:
            return state
    }
}

export default friendList;

/*

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
            data.status = 'send';
            return data;
        case 'FRIEND_REQUEST_SUCCESS':
            data.status = 'success';
            forEach(data.users, u => {
                if (parseInt(u.id) == action.data.friendRequest.friendId) {
                    u.friendUserId = action.data.friendRequest.userId
                }
            });
            return data;
        case 'FRIEND_REQUEST_ERROR':
            data.status = 'error';
            return data;

        case 'FRIEND_REMOVE_SEND':
            data.status = 'send';
            return data;
        case 'FRIEND_REMOVE_SUCCESS':
            data.status = 'success';
            forEach(data.users, u => {
                if (parseInt(u.id) == action.data.friendRemove.friendId) {
                    u.friendUserId = null;
                }
            });
            return data;
        case 'FRIEND_REMOVE_ERROR':
            data.status = 'error';
            return data;

        default:
            return state
    }
}

export default userList


*/
