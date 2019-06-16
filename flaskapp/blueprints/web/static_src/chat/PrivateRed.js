const friendId = parseInt(window.localParams.friendId);
const initState = {
    id: null,
    userId: null,
    friendId: friendId,
    date: null,
    users: [],
    messages: [],

    // technical info
    status: null
};

const chatPrivate = (state = initState, action) => {
    let data = {...state};

    switch (action.type) {
        case 'PRIVATE_JOIN_SEND':
            data.status =  'send';
            return data;
        case 'PRIVATE_JOIN_SUCCESS':
            data.id = action.id;
            data.date = action.date;
            data.users = action.users;
            data.messages = action.messages;
            data.status = 'success';
            return data;

        case 'PRIVATE_MSG_SEND':
            data.status = 'send_message';
            return data;
        case 'PRIVATE_MSG_SUCCESS':
            data.status = 'success';
            data.messages.push({
                id: action.id,
                userId: action.userId,
                userLogin: action.userLogin,
                chatId: action.chatId,
                date: action.date,
                text: action.text
            });
            return data;

        case 'ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;

        default:
            return state;
    }
};

export default chatPrivate;
