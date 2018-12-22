/*


drop table if exists "chat";
CREATE TABLE "chat" (
    "id" SERIAL PRIMARY KEY,
    "type" varchar(45) DEFAULT NULL
);


drop table if exists "chat_and_user";
CREATE TABLE "chat_and_user" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "chat_id" SERIAL NOT NULL
);

drop table if exists "chat_message";
CREATE TABLE "chat_message" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "chat_id" SERIAL NOT NULL,
    "text" text
);


*/

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

const PrivateRed = (state = initState, action) => {
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
            data.status = 'send';
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

export default PrivateRed;

/*


let blogId = window.localParams.blogId;
let postId = window.localParams.postId || '-1';
let initState = {
    id: parseInt(postId),
    blogId: parseInt(blogId),
    userId: 0,
    userName: '',
    userEmail: '',
    title: '',
    description: '',
    text: '',
    date: '',
    public: false,

    // technical info
    status: null,
};





const postEdit = (state = initState, action) => {
    let data = null;

    switch (action.type) {
        case 'MY_POST_GET_SEND':
            return {
                status: 'send',
                ...state
            };

        case 'MY_POST_GET_SUCCESS':
            data = {...state};
            data.status = 'success_get';
            data.id = action.data.getMyPost.id;
            data.blogId = action.data.getMyPost.blogId;
            data.userId = action.data.getMyPost.userId;
            data.userName = action.data.getMyPost.userName;
            data.userEmail = action.data.getMyPost.userEmail;
            data.title = action.data.getMyPost.title;
            data.description = action.data.getMyPost.description;
            data.text = action.data.getMyPost.text;
            data.date = action.data.getMyPost.date;
            data.public = !! action.data.getMyPost.public;
            return data;

        case 'MY_POST_GET_ERROR':
            return {
                status: 'error',
                error: action.error,
                ...state,
            };

        case 'POST_EDIT_SEND':
            data = {...state};
            data.status = 'send';
            data.id = action.id;
            data.blogId = action.blogId;
            data.title = action.title;
            data.description = action.description;
            data.text = action.text;
            data.public = action.public;
            return data;

        case 'POST_EDIT_SUCCESS':
            data = {...state};
            data.status = 'success_edit';
            data.id = action.data.editPost.id;
            data.blogId = action.data.editPost.blogId;
            data.title = action.data.editPost.title;
            data.description = action.data.editPost.description;
            data.text = action.data.editPost.text;
            data.date = action.data.editPost.date;
            data.public = action.data.editPost.public;
            return data;

        case 'POST_EDIT_ERROR':
            data = {...state};
            data.status = 'error';
            data.error = action.error;
            return data;


        default:
            return state
    }
}

export default postEdit;


*/
