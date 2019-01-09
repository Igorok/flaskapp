import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import './styles/index.scss'

import {layout} from './helpers/component'
import ListComp from './user/ListComp'

import auth from './auth/LoginRed'
import userList from './user/ListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	userList: userList,
});

let Comp = layout({comp: ListComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)