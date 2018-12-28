import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import friendListComp from './user/FriendListComp'

import auth from './auth/LoginRed'
import friendList from './user/FriendListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	friendList: friendList,
});

let Comp = layout({comp: friendListComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)
