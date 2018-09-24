let initState = {
    userId: window.localParams.userId ? parseInt(window.localParams.userId) : null,
    start: window.localParams.start ? parseInt(window.localParams.start) : 0,
    perpage: window.localParams.perpage ? parseInt(window.localParams.perpage) : 9,
    blogs: [],
    count: 0,
    status: null,
};
const myBlogList = (state = initState, action) => {
    let data = {...state};
    switch (action.type) {
        case 'MY_BLOG_LIST_SEND':
            data.start = action.start;
            data.status = 'send';
            return data;
        case 'MY_BLOG_LIST_SUCCESS':
            data.status = 'success';
            data.blogs = action.data.getMyBlogList.blogs;
            data.count = action.data.getMyBlogList.count;
            return data;
        case 'MY_BLOG_LIST_ERROR':
            data.status = 'error';
            return data;
        default:
            return state
    }
}

export default myBlogList
