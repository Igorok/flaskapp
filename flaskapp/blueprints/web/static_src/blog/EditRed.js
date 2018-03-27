let blogId = window.localParams.blogId || '-1';
let initState = {
    id: parseInt(blogId),
    userId: 0,
    userName: '',
    title: '',
    text: '',
    date: '',
    public: 0,
    status: null,
};

const blogEdit = (state = initState, action) => {
    switch (action.type) {
        case 'BLOG_GET_SEND':
            return {
                status: 'send',
                ...state
            };
        case 'BLOG_GET_SUCCESS':
            return {
                status: 'success',
                ...action.data.getBlog
            };
        case 'BLOG_GET_ERROR':
            return {
                status: 'error',
                error: action.error,
                ...state,
            };
        default:
            return state
    }
}

export default blogEdit