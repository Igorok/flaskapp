import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import RegComp from './auth/RegComp'

import auth from './auth/LoginRed'
import registration from './auth/RegRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
    auth: auth,
	registration: registration,
});

let Comp = layout({comp: RegComp});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)