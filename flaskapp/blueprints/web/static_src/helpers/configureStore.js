/*

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

export const configureStore = (reducerObj) => {
	return createStore(
		combineReducers(reducerObj),
		compose(
			applyMiddleware(thunk),
			applyMiddleware(createLogger()),
		)
	);
};

*/

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
            ),
            applyMiddleware(thunk),
            applyMiddleware(createLogger()),
        ),
    )

    return store
}