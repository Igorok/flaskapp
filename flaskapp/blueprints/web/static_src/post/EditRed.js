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
    title: '',
    description: '',
    text: '',
    date: '',
    public: false,

    // technical info
    status: null
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

export default postEdit











let blogId = window.localParams.blogId;
let postId = window.localParams.postId || '-1';
let initState = {
    id: parseInt(blogId),
    user_id: 0,
    user_name: '',
    title: '',
    text: '',
    date: '',
    public: false,
    status: null,
};


const blogEdit = (state = initState, action) => {
    let data = null;

    switch (action.type) {
        case 'BLOG_GET_SEND':
            return {
                status: 'send',
                ...state
            };
        case 'BLOG_GET_SUCCESS':
            data = {...state};
            data.status = 'success_get';
            data.id = action.data.getBlog.id;
            data.user_id = action.data.getBlog.userId;
            data.user_name = action.data.getBlog.userName;
            data.text = action.data.getBlog.text;
            data.title = action.data.getBlog.title;
            data.date = action.data.getBlog.date;
            data.public = !! action.data.getBlog.public;
            return data;
        case 'BLOG_GET_ERROR':
            return {
                status: 'error',
                error: action.error,
                ...state,
            };

        case 'BLOG_EDIT_SEND':
            data = {...state};
            data.status = 'send';
            data.id = action.id;
            data.text = action.text;
            data.title = action.title;
            data.public = action.public;
            return data;
        case 'BLOG_EDIT_SUCCESS':
            data = {...state};
            data.status = 'success_edit';
            data.id = action.data.editBlog.id;
            data.text = action.data.editBlog.text;
            data.title = action.data.editBlog.title;
            data.public = action.data.editBlog.public;
            return data;
        case 'BLOG_EDIT_ERROR':
            data = {...state};
            data.status = 'error';
            data.error = action.error;
            return data;


        default:
            return state
    }
}

export default blogEdit