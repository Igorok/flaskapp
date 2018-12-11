import {forEach} from 'lodash';
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
    console.log(
        'state',state,
        'action',action
    );

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
            forEach(data.users, u => {
                if (parseInt(u.id) == action.data.friendRequest.friendId) {

                    /*
                    selfFriendId = graphene.Int()
                    friendUserId = graphene.Int()
                    */
                    // u.selfFriendId = action.data.friendRequest.id
                    u.friendUserId = action.data.friendRequest.userId
                }
            });

            // data.users = action.data.getUserList.users;
            // data.count = action.data.getUserList.count;
            return data;
        case 'FRIEND_REQUEST_ERROR':
            data.status = 'error';
            // data.error = action.error;
            return data;

        case 'FRIEND_REMOVE_SEND':
            // data.start = action.start;
            data.status = 'send';
            return data;
        case 'FRIEND_REMOVE_SUCCESS':
            data.status = 'success';
            forEach(data.users, u => {

                console.log(
                    'action.data.friendRemove.id',
                    action.data.friendRemove.id
                );


                if (parseInt(u.id) == action.data.friendRemove.friendId) {

                    /*
                    selfFriendId = graphene.Int()
                    friendUserId = graphene.Int()
                    */
                    u.friendUserId = null;
                }
            });
            return data;
        case 'FRIEND_REMOVE_ERROR':
            data.status = 'error';
            // data.error = action.error;
            return data;

        default:
            return state
    }
}

export default userList