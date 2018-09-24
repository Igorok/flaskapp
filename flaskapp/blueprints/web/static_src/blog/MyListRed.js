import {forEach} from 'lodash';
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
            data.error = action.error;
            return data;

        case 'MY_BLOG_PUBLIC_SEND':
            data.start = action.start;
            data.status = 'send';
            return data;
        case 'MY_BLOG_PUBLIC_SUCCESS':
            data.status = 'success';
            forEach(data.blogs, (blog) => {
                if (blog.id == action.data.publicMyBlog.id) {
                    blog.public = action.data.publicMyBlog.public;
                }
            });


            return data;
        case 'MY_BLOG_PUBLIC_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;

        default:
            return state
    }
}

export default myBlogList
