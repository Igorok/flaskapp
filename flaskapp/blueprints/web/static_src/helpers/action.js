import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import {query} from './graphql'
// import {push} from 'react-router-redux';

/**
 * http request to the web api
 * @param {Object} opts 
 * @param {String} opts.type - required, this is the type of action for reducer
 * @param {String} opts.fetch - required, this is the name api and function for backend
 */
export const api = (opts) => {	
    return (dispatch) => {
        let type = opts.type;
        delete opts.type;

        let user = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            opts.token = user.token;
        }

        let param = {
            method: 'POST', 
            body: JSON.stringify(opts),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        
        let sendOpts = {...opts};
        sendOpts.type = type + '_SEND';
        dispatch(sendOpts);


        let status = null;
        return fetch('/fetch', param)
            .then((r) => {
                status = r.status;
                return r.json();
            })
            .then((r) => {
                if (status == 403) {
                    throw new Error(status);
                } else if (status != 200) {
                    throw new Error(r);
                } else {
                    r = {data: r, type: type + '_SUCCESS'}; 
                    return dispatch(r);
                }
            })
            .catch((e) => {
                if (e.message && e.message.toString() === '403') {
                    localStorage.removeItem('user');
                    return window.location = '/login'
                }

                e = {
                    type: type + '_ERROR',
                    error: e.message || 'Oops, something wrong!',
                }; 
                return dispatch(e);
            });
    }
    
};


export const graphql = (opts) => {
    return (dispatch) => {
        let type = opts.type;
        delete opts.type;

        let sendOpts = {...opts};
        sendOpts.type = type + '_SEND';
        dispatch(sendOpts);

        opts.device = 'web';
        let user = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            opts.token = user.token;
        }

        let param = {
            method: 'POST', 
            body: query[type](opts),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        let status = null;
        return fetch('/graphql', param)
            .then((r) => {
                status = r.status;
                return r.json();
            })
            .then((r) => {
                if (status == 403) {
                    throw new Error(403);
                }
                else if (status != 200) {
                    throw new Error(r);
                }
                else if (r.error) {
                    if (r.error.code == 403) {
                        throw new Error(403);
                    } else {
                        throw new Error(r.error.message);
                    }
                }
                else {
                    r = {data: r.data, type: type + '_SUCCESS'}; 
                    return dispatch(r);
                }
            })
            .catch((e) => {
                console.log('error', e);

                if (e.message && e.message.toString() === '403') {
                    localStorage.removeItem('user');
                    return window.location = '/login'
                }

                e = {
                    type: type + '_ERROR',
                    error: e.message || 'Oops, something wrong!',
                }; 
                return dispatch(e);
            });
    }
    
};