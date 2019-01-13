import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'highlightjs/styles/vs2015.css'
import 'font-awesome/scss/font-awesome.scss';
import './styles/index.scss'

import {layout} from './helpers/component'
import DetailComp from './post/DetailComp'

import auth from './auth/LoginRed'
import postDetail from './post/DetailRed'

import {configureStore} from './helpers/configureStore'


let store = configureStore({
	auth: auth,
	postDetail: postDetail,
});

let Comp = layout({comp: DetailComp});
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)
