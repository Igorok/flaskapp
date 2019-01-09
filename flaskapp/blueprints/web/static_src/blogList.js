import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import './styles/index.scss'

import {layout} from './helpers/component'
import ListComp from './blog/ListComp'

import auth from './auth/LoginRed'
import blogList from './blog/ListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	blogList: blogList,
});

let Comp = layout({comp: ListComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)