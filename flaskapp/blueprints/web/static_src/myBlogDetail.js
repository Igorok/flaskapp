import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import MyListComp from './post/MyListComp'

import auth from './auth/LoginRed'
import myPostList from './post/MyListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	myPostList: myPostList,
});

let Comp = layout({comp: MyListComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)