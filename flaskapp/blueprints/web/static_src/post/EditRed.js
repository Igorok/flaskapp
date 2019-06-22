/*

"id" SERIAL PRIMARY KEY,
"user_id" SERIAL NOT NULL,
"blog_id" SERIAL NOT NULL,
"title" varchar(128) DEFAULT NULL,
"description" varchar(256) DEFAULT NULL,
"text" text,
"date" timestamp DEFAULT NULL

*/
import { LOCATION_CHANGE } from 'connected-react-router';

let initState = {
    id: 0,
    blogId: 0,
    userId: 0,
    userName: '',
    userEmail: '',
    title: '',
    description: '',
    text: '',
    date: '',
    public: false,

    // technical info
    status: null,
};


const postEdit = (state = initState, action) => {
    let data = Object.assign({state});

    switch (action.type) {
        case 'MY_POST_GET_SEND':
            data.status = 'send';
            return data;

        case 'MY_POST_GET_SUCCESS':
            data.status = 'success_get';
            data.id = action.data.getMyPost.id;
            data.blogId = action.data.getMyPost.blogId;
            data.userId = action.data.getMyPost.userId;
            data.userName = action.data.getMyPost.userName;
            data.userEmail = action.data.getMyPost.userEmail;
            data.title = action.data.getMyPost.title;
            data.description = action.data.getMyPost.description;
            data.text = action.data.getMyPost.text;
            data.date = action.data.getMyPost.date;
            data.public = !! action.data.getMyPost.public;
            return data;

        case 'MY_POST_GET_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;

        case 'POST_EDIT_SEND':
            data.status = 'send';
            data.id = action.id;
            data.blogId = action.blogId;
            data.title = action.title;
            data.description = action.description;
            data.text = action.text;
            data.public = action.public;
            return data;

        case 'POST_EDIT_SUCCESS':
            data.status = 'success_edit';
            data.id = action.data.editPost.id;
            data.blogId = action.data.editPost.blogId;
            data.title = action.data.editPost.title;
            data.description = action.data.editPost.description;
            data.text = action.data.editPost.text;
            data.date = action.data.editPost.date;
            data.public = action.data.editPost.public;
            return data;
            
        case 'POST_EDIT_ERROR':
            data.status = 'error';
            data.error = action.error;
            return data;

        case LOCATION_CHANGE:
            return Object.assign({initState});
        default:
            return data;
    }
}

export default postEdit;