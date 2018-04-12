let blogId = window.localParams.blogId || '-1';
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