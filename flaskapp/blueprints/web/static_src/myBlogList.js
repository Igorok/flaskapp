import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import './styles/index.scss'

import {layout} from './helpers/component'
import MyListComp from './blog/MyListComp'

import auth from './auth/LoginRed'
import myBlogList from './blog/MyListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	myBlogList: myBlogList,
});

let Comp = layout({comp: MyListComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)