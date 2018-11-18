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


const postDetail = (state = initState, action) => {
    let data = null;

    switch (action.type) {
        case 'POST_GET_SEND':
            data = {...state};
            data.status = 'send';
            return data;

        case 'POST_GET_SUCCESS':
            data = {...state};
            data.status = 'success';
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
            data = {...state};
            data.status = 'error';
            data.error = action.error;
            return data;

        default:
            return state
    }
}

export default postDetail;