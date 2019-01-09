import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import './styles/index.scss'

import {layout} from './helpers/component'
import PrivateComp from './chat/PrivateComp'

import auth from './auth/LoginRed'
import PrivateRed from './chat/PrivateRed'

import {configureStore} from './helpers/configureStore'


let store = configureStore({
	auth: auth,
	chatPrivate: PrivateRed,
});

let Comp = layout({comp: PrivateComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)
