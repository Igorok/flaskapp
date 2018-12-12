import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import ChatComp from './chat/ChatComp'

import auth from './auth/LoginRed'
import chat from './chat/ChatRed'

import {configureStore} from './helpers/configureStore'


let store = configureStore({
	auth: auth,
	chat: chat,
});

let Comp = layout({comp: ChatComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)
