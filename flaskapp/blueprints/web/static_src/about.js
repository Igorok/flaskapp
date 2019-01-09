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