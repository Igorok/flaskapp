import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

import {layout} from './helpers/component'
import ProfileComp from './profile/ProfileComp'

import auth from './auth/LoginRed'
import profile from './profile/ProfileRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	profile: profile,
});

let Comp = layout({comp: ProfileComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)