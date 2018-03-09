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

const USER_AUTH = (opts) => {
    let q = {
        query: compress(`{
            query userlist($id: Int) {
                users (id: $id) {
                    user {
                        id
                        login
                        email
                        role
                    }
                }
            }
        }`),
        variables: {
            id: opts.id
        },
    }
    return JSON.stringify(q);
};

export const query = {
    USER_LIST: USER_LIST,
}

