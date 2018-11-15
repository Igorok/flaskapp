/*

"id" SERIAL PRIMARY KEY,
"user_id" SERIAL NOT NULL,
"blog_id" SERIAL NOT NULL,
"title" varchar(128) DEFAULT NULL,
"description" varchar(256) DEFAULT NULL,
"text" text,
"date" timestamp DEFAULT NULL

*/

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
        case 'POST_GET_SEND':
            return {
                status: 'send',
                ...state
            };

        case 'POST_GET_SUCCESS':
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

        case 'POST_GET_ERROR':
            return {
                status: 'error',
                error: action.error,
                ...state,
            };


        default:
            return state
    }
}

export default postEdit;