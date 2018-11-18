import compress from "graphql-query-compress";

const USER_LIST = (opts) => {
    let q = {
        query: compress(`
            query userlist($id: String) {
                userlist (id: $id) {
                    users {
                        id
                        login
                        role
                    }
                }
            }
        `),
        variables: {
            id: opts.id
        },
    }
    return JSON.stringify(q);
};

const REG = (opts) => {
    let q = {
        query: compress(`
            query registration($email: String, $password: String, $confirmPassword: String, $device: String) {
                registration (email: $email, password: $password, confirmPassword: $confirmPassword, device: $device) {
                    login
                    email
                }
            }
        `),
        variables: {
            email: opts.email,
            password: opts.password,
            confirmPassword: opts.confirmPassword,
            device: opts.device,
        },
    }
    return JSON.stringify(q);
};

const AUTH = (opts) => {
    let q = {
        query: compress(`
            query auth($login: String, $password: String, $device: String) {
                auth (login: $login, password: $password, device: $device) {
                    id
                    login
                    token
                }
            }
        `),
        variables: {
            login: opts.login,
            password: opts.password,
            device: opts.device,
        },
    }
    return JSON.stringify(q);
};

const PROFILE = (opts) => {
    let q = {
        query: compress(`
            query profile ($token: String, $device: String) {
                profile (token: $token, device: $device) {
                    id
                    login
                    email
                    friends
                    friendRequests
                    selfFriendRequests
                    countChats
                    countBlogs
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
        },
    }
    return JSON.stringify(q);
};

const PROFILE_EDIT = (opts) => {
    let q = {
        query: compress(`
            query editProfile ($token: String!, $device: String!, $login: String!, $email: String!) {
                editProfile (token: $token, device: $device, login: $login, email: $email) {
                    login
                    email
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            login: opts.login,
            email: opts.email,
        },
    }
    return JSON.stringify(q);
};

const BLOG_EDIT = (opts) => {
    let q = {
        query: compress(`
            query editBlog ($token: String!, $device: String!, $id: Int!, $title: String!, $text: String!, $public: Boolean) {
                editBlog (token: $token, device: $device, id: $id, title: $title, text: $text, public: $public) {
                    id
                    userId
                    userName
                    title
                    text
                    date
                    public
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            id: opts.id,
            title: opts.title,
            text: opts.text,
            public: opts.public,
        },
    }
    return JSON.stringify(q);
};

const BLOG_GET = (opts) => {
    let q = {
        query: compress(`
            query getBlog ($token: String!, $device: String!, $id: Int!) {
                getBlog (token: $token, device: $device, id: $id) {
                    id
                    userId
                    userName
                    userEmail
                    title
                    text
                    date
                    public
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            id: opts.id,
        },
    }
    return JSON.stringify(q);
};

const BLOG_LIST = (opts) => {
    let q = {
        query: compress(`
            query getBlogList ($token: String, $device: String!, $userId: Int, $start: Int, $perpage: Int) {
                getBlogList (token: $token, device: $device, userId: $userId, start: $start, perpage: $perpage) {
                    blogs {
                        id
                        userId
                        userName
                        userEmail
                        title
                        text
                        date
                        public
                    }
                    count
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            userId: opts.userId,
            start: opts.start,
            perpage: opts.perpage,
        },
    }
    return JSON.stringify(q);
};

const MY_BLOG_LIST = (opts) => {
    let q = {
        query: compress(`
            query getMyBlogList ($token: String!, $device: String!, $start: Int, $perpage: Int) {
                getMyBlogList (token: $token, device: $device, start: $start, perpage: $perpage) {
                    blogs {
                        id
                        userId
                        userName
                        userEmail
                        title
                        text
                        date
                        public
                    }
                    count
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            start: opts.start,
            perpage: opts.perpage,
        },
    }
    return JSON.stringify(q);
};

const MY_BLOG_PUBLIC = (opts) => {
    let q = {
        query: compress(`
            query publicMyBlog ($token: String!, $device: String!, $id: Int, $public: Boolean) {
                publicMyBlog (token: $token, device: $device, id: $id, public: $public) {
                    id
                    public
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            id: opts.id,
            public: opts.public,
        },
    }
    return JSON.stringify(q);
};


const POST_EDIT = (opts) => {
    let q = {
        query: compress(`query editPost ($token: String!, $device: String!, $id: Int!, $blogId: Int!, $title: String!, $descript: String!, $text: String!, $public: Boolean) {
                editPost (token: $token, device: $device, id: $id, blogId: $blogId, title: $title, descript: $descript, text: $text, public: $public) {
                    id
                    blogId
                    title
                    description
                    text
                    date
                    public
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            id: opts.id,
            blogId: opts.blogId,
            title: opts.title,
            descript: opts.description,
            text: opts.text,
            public: opts.public,
        },
    }
    return JSON.stringify(q);
};

const MY_POST_GET = (opts) => {
    let q = {
        query: compress(`
            query getMyPost ($token: String!, $device: String!, $id: Int!, $blogId: Int!) {
                getMyPost (token: $token, device: $device, id: $id, blogId: $blogId) {
                    id
                    blogId
                    userId
                    userName
                    userEmail
                    title
                    description
                    text
                    date
                    public
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            id: opts.id,
            blogId: opts.blogId,
        },
    }
    return JSON.stringify(q);
};

const MY_BLOG_DETAIL = (opts) => {
    let q = {
        query: compress(`
            query getMyBlogDetail ($token: String!, $device: String!, $blogId: Int!, $start: Int!, $perpage: Int!) {
                getMyBlogDetail (token: $token, device: $device, blogId: $blogId, start: $start, perpage: $perpage) {
                    count
                    blog {
                        id, title, text, public, date, userId, userName
                    }
                    posts {
                        id, blogId, title, description, public, date, userId, userName
                    }
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            blogId: opts.blogId,
            start: opts.start,
            perpage: opts.perpage,
        },
    }
    return JSON.stringify(q);
};

const BLOG_DETAIL = (opts) => {
    let q = {
        query: compress(`
            query getBlogDetail ($token: String!, $device: String!, $blogId: Int!, $start: Int!, $perpage: Int!) {
                getBlogDetail (token: $token, device: $device, blogId: $blogId, start: $start, perpage: $perpage) {
                    count
                    blog {
                        id, title, text, public, date, userId, userName
                    }
                    posts {
                        id, blogId, title, description, public, date, userId, userName
                    }
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            blogId: opts.blogId,
            start: opts.start,
            perpage: opts.perpage,
        },
    }
    return JSON.stringify(q);
};

const POST_GET = (opts) => {
    let q = {
        query: compress(`
            query getPost ($token: String!, $device: String!, $id: Int!, $blogId: Int!) {
                getPost (token: $token, device: $device, id: $id, blogId: $blogId) {
                    id
                    blogId
                    userId
                    userName
                    userEmail
                    title
                    description
                    text
                    date
                    public
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            id: opts.id,
            blogId: opts.blogId,
        },
    }
    return JSON.stringify(q);
};

export const query = {
    REG: REG,
    AUTH: AUTH,
    PROFILE: PROFILE,
    PROFILE_EDIT: PROFILE_EDIT,

    BLOG_GET: BLOG_GET,
    BLOG_EDIT: BLOG_EDIT,
    BLOG_LIST: BLOG_LIST,
    BLOG_DETAIL: BLOG_DETAIL,

    MY_BLOG_LIST: MY_BLOG_LIST,
    MY_BLOG_PUBLIC: MY_BLOG_PUBLIC,
    MY_BLOG_DETAIL: MY_BLOG_DETAIL,

    MY_POST_GET: MY_POST_GET,
    POST_EDIT: POST_EDIT,
    POST_GET: POST_GET,

    USER_LIST: USER_LIST,
}
