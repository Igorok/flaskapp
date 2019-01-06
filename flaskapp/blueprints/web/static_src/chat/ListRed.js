let initState = {
    start: window.localParams.start ? parseInt(window.localParams.start) : 0,
    perpage: window.localParams.perpage ? parseInt(window.localParams.perpage) : 9,
    chatPrivate: [],
    chatGroup: [],
    count: 0,
    status: null,
    error: null,
};
const chatList = (state = initState, action) => {
    let data = {...state};
    switch (action.type) {
        case 'CHAT_LIST_SEND':
            data.start = action.start;
            data.status = 'send';
            return data;
        case 'CHAT_LIST_SUCCESS':
            data.status = 'success';
            data.chatPrivate = action.data.getChatList.chatPrivate;
            data.chatGroup = action.data.getChatList.chatGroup;
            data.count = action.data.getChatList.count;
            return data;
        case 'CHAT_LIST_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;
        default:
            return state
    }
}

export default chatList;