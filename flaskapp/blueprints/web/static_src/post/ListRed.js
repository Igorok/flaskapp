let initState = {
    blogId: null,
    count: 0,
    blog: null,
    posts: [],
    status: null,
};

const postList = (state = initState, action) => {
    let data = {...state};
    switch (action.type) {
        case 'BLOG_DETAIL_SEND':
            data.status = 'send';
            return data;
        case 'BLOG_DETAIL_SUCCESS':
            data.status = 'success';
            data.count = action.data.getBlogDetail.count;
            data.blog = action.data.getBlogDetail.blog;
            data.posts = action.data.getBlogDetail.posts;
            
            return data;
        case 'BLOG_DETAIL_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;

        default:
            return state
    }
}
export default postList
