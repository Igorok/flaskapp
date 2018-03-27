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

const BLOG_ADD = (opts) => {
    let q = {
        query: compress(`
            query addBlog ($token: String!, $device: String!, $title: String!, $text: String!) {
                addBlog (token: $token, device: $device, title: $title, text: $text) {
                    title
                    text
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            title: opts.title,
            text: opts.text,
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
            title: opts.title,
            text: opts.text,
        },
    }
    return JSON.stringify(q);
};

const BLOG_LIST = (opts) => {
    let q = {
        query: compress(`
            query blogList ($token: String!, $device: String!, $userId: Int, $from: Int, $to: Int) {
                blogList (token: $token, device: $device, userId: $userId, from: $from, to: $to) {
                    list {
                        id
                        title
                        text
                        userId
                        userName
                        date
                    }
                }
            }
        `),
        variables: {
            token: opts.token,
            device: opts.device,
            title: opts.title,
            text: opts.text,
        },
    }
    return JSON.stringify(q);
};

export const query = {
    AUTH: AUTH,
    PROFILE: PROFILE,
    PROFILE_EDIT: PROFILE_EDIT,


    USER_LIST: USER_LIST,
}

