import {remove} from 'lodash';
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
            data.friends = action.data.getFriendList.friends;
            data.count = action.data.getFriendList.count;
            return data;
        case 'FRIEND_LIST_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;

        case 'FRIEND_REMOVE_SEND':
            data.status = 'send';
            return data;
        case 'FRIEND_REMOVE_SUCCESS':
            data.status = 'success';
            remove(data.friends, u => {
                return parseInt(u.id) == action.data.friendRemove.friendId
            });
            return data;
        case 'FRIEND_REMOVE_ERROR':
            data.status = 'error';
            return data;
            
        default:
            return state
    }
}

export default friendList;