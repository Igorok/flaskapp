let initState = {
    userId: window.localParams.userId ? parseInt(window.localParams.userId) : null,
    start: window.localParams.start ? parseInt(window.localParams.start) : 0,
    perpage: window.localParams.perpage ? parseInt(window.localParams.perpage) : 9,
    blogs: [],
    count: 0,
    status: null,
    error: null,
};
const blogList = (state = initState, action) => {
    let data = {...state};
    switch (action.type) {
        case 'BLOG_LIST_SEND':
            data.start = action.start;
            data.status = 'send';
            return data;
        case 'BLOG_LIST_SUCCESS':
            data.status = 'success';
            data.blogs = action.data.getBlogList.blogs;
            data.count = action.data.getBlogList.count;
            return data;
        case 'BLOG_LIST_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;
        default:
            return state
    }
}

export default blogList