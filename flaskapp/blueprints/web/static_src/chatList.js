import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import ListComp from './chat/ListComp'

import auth from './auth/LoginRed'
import chatList from './chat/ListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	chatList: chatList,
});

let Comp = layout({comp: ListComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)