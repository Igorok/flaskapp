import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import EditComp from './blog/EditComp'

import auth from './auth/LoginRed'
import postEdit from './post/EditRed'

import {configureStore} from './helpers/configureStore'


let store = configureStore({
	auth: auth,
	postEdit: postEdit,
});

let Comp = layout({comp: EditComp, forAuth: true});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)
