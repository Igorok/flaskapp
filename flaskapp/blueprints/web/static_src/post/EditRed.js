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
            data.id = action.data.getPost.id;
            data.blogId = action.data.getPost.blogId;
            data.userId = action.data.getPost.userId;
            data.userName = action.data.getPost.userName;
            data.userEmail = action.data.getPost.userEmail;
            data.title = action.data.getPost.title;
            data.description = action.data.getPost.description;
            data.text = action.data.getPost.text;
            data.date = action.data.getPost.date;
            data.public = !! action.data.getPost.public;
            return data;

        case 'POST_GET_ERROR':
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