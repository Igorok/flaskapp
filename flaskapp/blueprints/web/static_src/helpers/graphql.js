import compress from "graphql-query-compress";

const USER_LIST = (opts) => {
    let q = {
        query: compress(`{
            query USER_LIST($id: Id) {
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

export const schemas = {
    USER_LIST: USER_LIST,
}

