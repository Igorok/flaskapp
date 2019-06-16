// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from '../auth/LoginRed';
import blogList from '../blog/ListRed';
import blogEdit from '../blog/EditRed';
import postList from '../post/ListRed';
import chatList from '../chat/ListRed';
import chatPrivate from '../chat/PrivateRed';
import friendList from '../user/FriendListRed';
import myBlogList from '../blog/MyListRed';
import myPostList from '../post/MyListRed';
import postDetail from '../post/DetailRed';
import postEdit from '../post/EditRed';
import profile from '../profile/ProfileRed';
import registration from '../auth/RegRed';
import userList from '../user/ListRed';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: auth,
    blogList: blogList,
    blogEdit: blogEdit,
    postList: postList,
    chatList: chatList,
    chatPrivate: chatPrivate,
    friendList: friendList,
    myBlogList: myBlogList,
    myPostList: myPostList,
    postDetail: postDetail,
    postEdit: postEdit,
    profile: profile,
    registration: registration,
    userList: userList
});