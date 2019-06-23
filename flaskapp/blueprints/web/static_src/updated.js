import React from 'react'
import { render } from 'react-dom'


import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './helpers/configureStore'




import 'font-awesome/scss/font-awesome.scss';
import './styles/index.scss'

import { layout } from './helpers/component';
import LoginComp from './auth/LoginComp'
import RegistrationComp from './auth/RegComp';

import AboutComp from './about/AboutComp';
import BlogListComp from './blog/ListComp';
import PostListComp from './post/ListComp';
import PostDetailComp from './post/DetailComp';
import ProfileComp from './profile/ProfileComp';

import MyBlogListComp from './blog/MyListComp';
import BlogEditComp from './blog/EditComp';
import MyPostListComp from './post/MyListComp';
import PostEditComp from './post/EditComp';
import UserListComp from './user/ListComp'
import FriendListComp from './user/FriendListComp'
import ChatPrivateComp from './chat/PrivateComp';
import ChatListComp from './chat/ListComp';


const store = configureStore(/* provide initial state if any */)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
            <> { /* your usual react-router v4/v5 routing */ }
                <Switch>
                    <Route exact path="/" component={ layout({comp: AboutComp}) } />
                    <Route exact path="/blogs" component={ layout({comp: BlogListComp }) } />
                    <Route exact path="/blog/:blogId" component={ layout({comp: PostListComp})} />
                    <Route exact path="/post/:blogId/:postId" component={ layout({comp: PostDetailComp})} />

                    <Route
                        exact path="/login"
                        component={ layout({comp: LoginComp, forNotAuth: true}) }
                    />
                    <Route
                        exact path="/registration"
                        component={ layout({comp: RegistrationComp, forNotAuth: true}) }
                    />
                    <Route
                        exact path="/profile"
                        component={ layout({comp: ProfileComp, forAuth: true}) }
                    />
                    <Route
                        exact path="/my-blogs"
                        component={ layout({comp: MyBlogListComp, forAuth: true}) }
                    />
                    <Route
                        exact path="/blog-edit/:blogId"
                        component={ layout({comp: BlogEditComp, forAuth: true}) }
                    />
                    <Route
                        exact path="/my-blog-detail/:blogId"
                        component={ layout({comp: MyPostListComp, forAuth: true}) }
                    />
                    <Route
                        exact path="/post-edit/:blogId/:postId"
                        component={ layout({comp: PostEditComp, forAuth: true}) }
                    />


                    <Route
                        exact path="/users"
                        component={ layout({comp: UserListComp, forAuth: true}) }
                    />
                    <Route
                        exact path="/friends"
                        component={ layout({comp: FriendListComp, forAuth: true}) }
                    />
                    <Route
                        exact path="/chat-list"
                        component={ layout({comp: ChatListComp, forAuth: true}) }
                    />
                    <Route
                        exact path="/chat-private/:friendId"
                        component={ layout({comp: ChatPrivateComp, forAuth: true}) }
                    />


                    <Route render={ () => {
                        return <p>Not found</p>
                    }} />
                </Switch>
            </>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
