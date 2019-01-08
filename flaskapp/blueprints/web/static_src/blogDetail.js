import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import ListComp from './post/ListComp'

import auth from './auth/LoginRed'
import postList from './post/ListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	postList: postList,
});

let Comp = layout({comp: ListComp, forAuth: false});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)