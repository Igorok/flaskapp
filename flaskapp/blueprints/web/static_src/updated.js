import React from 'react'
import { render } from 'react-dom'


import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './helpers/configureStore'




import 'font-awesome/scss/font-awesome.scss';
import './styles/index.scss'

import {layout} from './helpers/component';
import AboutComp from './about/AboutComp';
import BlogListComp from './blog/ListComp';
import PostListComp from './post/ListComp';
import PostDetailComp from './post/DetailComp';


const store = configureStore(/* provide initial state if any */)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
            <> { /* your usual react-router v4/v5 routing */ }
                <Switch>
                    <Route exact path="/" component={ layout({comp: AboutComp}) } />
                    <Route exact path="/blogs" component={ layout({comp: BlogListComp}) } />
                    <Route exact path="/blog/:blogId" component={ layout({comp: PostListComp})} />
                    <Route exact path="/post/:blogId/:postId" component={ layout({comp: PostDetailComp})} />
                    <Route render={ () => {
                        return <p>Not found</p>
                    }} />
                </Switch>
            </>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
/*



# @web.route('/post/<blogId>/<postId>')
# def postDetail(blogId, postId):
#     return render_template(
#         'view.html',
#         scripts = ['postDetail'],
#         params = [
#             {'name': 'blogId', 'val': blogId},
#             {'name': 'postId', 'val': postId},
#             {'name': 'page', 'val': 'blog'}
#         ]
#     )



*/

/*




/*


# @web.route('/profile')
# def profile():
#     params = [
#         {'name': 'page', 'val': 'profile'}
#     ]
#     return render_template('view.html', scripts=['profile'], params=params)

# @web.route('/login')
# def login():
#     return render_template('view.html', scripts=['login'])

# @web.route('/registration')
# def registration():
#     return render_template('view.html', scripts=['registration'])





# @web.route('/my-blogs')
# def myBlogList():
#     params = getParams(['start', 'perpage'], request.args)
#     params.append({'name': 'page', 'val': 'blog'})
#     return render_template(
#         'view.html',
#         scripts = ['myBlogList'],
#         params = params
#     )

# @web.route('/blog-edit/<blogId>')
# def blogEdit(blogId):
#     return render_template(
#         'view.html',
#         scripts = ['blogEdit'],
#         params = [
#             {'name': 'blogId', 'val': blogId},
#             {'name': 'page', 'val': 'blog'}
#         ]
#     )

# @web.route('/my-blog-detail/<blogId>')
# def myBlogDetail(blogId):
#     params = getParams(['start', 'perpage'], request.args)
#     params.append({'name': 'page', 'val': 'blog'})
#     params.append({'name': 'blogId', 'val': blogId})

#     return render_template(
#         'view.html',
#         scripts = ['myBlogDetail'],
#         params = params
#     )

# @web.route('/post-edit/<blogId>/<postId>')
# def postEdit(blogId, postId):
#     return render_template(
#         'view.html',
#         scripts = ['postEdit'],
#         params = [
#             {'name': 'blogId', 'val': blogId},
#             {'name': 'postId', 'val': postId},
#             {'name': 'page', 'val': 'blog'}
#         ]
#     )



# @web.route('/users')
# def userList():
#     params = getParams(['start', 'perpage'], request.args)
#     params.append({'name': 'page', 'val': 'user'})
#     return render_template(
#         'view.html',
#         scripts = ['userList'],
#         params = params
#     )

# @web.route('/friends')
# def friendList():
#     params = getParams(['start', 'perpage'], request.args)
#     params.append({'name': 'page', 'val': 'friend'})
#     return render_template(
#         'view.html',
#         scripts = ['friendList'],
#         params = params
#     )

# @web.route('/chat-private/<friendId>')
# def chatPrivate(friendId):
#     params = [
#         {'name': 'page', 'val': 'chatList'},
#         {'name': 'friendId', 'val': friendId}
#     ]
#     return render_template(
#         'view.html',
#         scripts = ['chatPrivate'],
#         params = params
#     )

# @web.route('/chat-list')
# def chatList():
#     params = [
#         {'name': 'page', 'val': 'chatList'}
#     ]
#     return render_template(
#         'view.html',
#         scripts = ['chatList'],
#         params = params
#     )






import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import './styles/index.scss'

import {layout} from './helpers/component'
import AboutComp from './about/AboutComp'

import auth from './auth/LoginRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
});

let Comp = layout({comp: AboutComp});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)



*/






