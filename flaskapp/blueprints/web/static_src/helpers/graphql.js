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




export const query = {
    AUTH: AUTH,
    PROFILE: PROFILE,


    USER_LIST: USER_LIST,
}

