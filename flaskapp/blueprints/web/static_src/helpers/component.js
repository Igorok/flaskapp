import React from 'react'
import { connect } from 'react-redux'
import { graphql } from '../helpers/action';
import {Alert, Dropdown} from 'bootstrap'

import { Link } from 'react-router-dom'

import 'jquery';

/**
 * boostrap message
 * @param {String} className - success, info, warning, danger
 * @param {String} text - the text of the message
 */
export class AlertMessage extends React.Component {
    render () {
        let tpl = null;
        if (
            this.props.opts &&
            this.props.opts.className &&
            this.props.opts.text
        ) {
            let className = "alert alert-" + this.props.opts.className;
            tpl = <div className={className} role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.opts.text}
            </div>
        }
        return tpl;
    }
}
/**
 * check a sum of two numbers
 * @param {Function} cb - callback to use a result of validation
 */
export class MathCaptcha extends React.Component {
    constructor(props) {
        super(props);
        let v1 = this.getRandomInt(0, 10);
        let v2 = this.getRandomInt(0, 10);

        this.state = {
            v1: v1,
            v2: v2,
            sum: v1 + v2,
            isValid: null,
        }
    }
    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    changeSum (e) {
        this.setState({
            isValid: parseInt(e.target.value) === this.state.sum,
        }, () => {
            if (this.props.cb && typeof(this.props.cb) === 'function') {
                this.props.cb(this.state.isValid);
            }
        });
    }
    render () {
        let inputClass = 'form-control';
        if (this.state.isValid === true) {
            inputClass += ' is-valid';
        } else if (this.state.isValid === false) {
            inputClass += ' is-invalid';
        }

        return <div>
            <div className='form-inline'>
                <label htmlFor="sum" className='control-label'>
                    {this.state.v1} + {this.state.v2} =
                    &nbsp;&nbsp;
                </label>
                <input
                    type="number"
                    className={inputClass}
                    id="sum"
                    placeholder="Sum"
                    onChange={::this.changeSum}
                />
            </div>
            <br />
        </div>
    }
}


class Header extends React.Component {
    logout (e) {
        e.preventDefault();
        this.props.logout();
    }
    render () {
        let profileItem = null;
        let userItem = null;

        if (this.props.auth.isAuthenticated) {
            profileItem = <div className="nav-item dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.auth.login}
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/my-blogs">My blogs</Link>
                    <Link className="dropdown-item" to="/blog-edit/-1">Add blog</Link>
                    <Link className="dropdown-item" to="/friends">Friends</Link>
                    <Link className="dropdown-item" to="/chat-list">Chats</Link>
                    <Link className="dropdown-item" to="#" onClick={::this.logout}>Logout</Link>
                </div>
            </div>

            userItem = <li className={window.localParams.page == 'user' ? 'nav-item active' : 'nav-item'}>
                <Link className="nav-link" to="/users">
                    <i className="fa fa-users"></i>&nbsp;
                    Users
                    <span className="sr-only">(current)</span>
                </Link>
            </li>
        }

        return <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="#">FlaskApp</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    <li className={window.localParams.page == 'about' ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/">
                            <i className="fa fa-home"></i>&nbsp;
                            About
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className={window.localParams.page == 'blog' ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/blogs">
                            <i class="fa fa-bookmark"></i>&nbsp;
                            Blogs
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>

                    { userItem }
                </ul>
                { profileItem }
            </div>
        </nav>
    }
};



/**
 * function to render layout
 * @param {Class} opts.comp - React.Component that need to render
 * @param {Boolean} opts.forAuth - this component only for authenticated users
 */
export const layout = opts => {
    let Component = opts.comp;
    let forAuth = opts.forAuth;

    class Layout extends React.Component {        
        logout () {
            this.props.dispatch(graphql({
                type: 'LOGOUT'
            }));
        }
        componentWillMount() {
            this.checkAuth(this.props.auth)
        }
        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.auth)
        }
        checkAuth(auth) {
            // if this page only for authenticated users and the storage has no isAuthenticated
            if (forAuth && ! auth.isAuthenticated) {
                return window.location = '/';
            }
        }
        render() {
            return <div class="container-fluid">
                <Header auth={this.props.auth} logout={::this.logout} />
                <Component {...this.props.match.params} />
            </div>
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth
        }
    }
    return connect(mapStateToProps)(Layout)
}


/**
 * check a sum of two numbers
 *
 * @param {Integer} start - number of the sql row for request
 * @param {Integer} perpage - number rows for the page
 * @param {Integer} count - count of all pages
 * @param {Array} items - components for render
 * @param {Function} changePage - callback with new params
 */
export class PaginatorLayout extends React.Component {
    getBtns () {
        // received params
        const start = this.props.param.start || 0;
        const perpage = this.props.param.perpage || 10;
        const count = this.props.param.count || 0;

        // calculate count of buttons, active button
        const pageCount = Math.ceil(count / perpage);
        const showBtns = 5;
        const showStep = Math.floor(showBtns / 2);
        const startBtn = this.props.param.start / perpage;

        let btns = [];

        // number of shown buttons is showBtns
        // left and right buttons
        let left = null;
        let right = null;

        // left border
        if (startBtn - showStep <= 0) {
            left = 0;
        } else {
            if (startBtn == pageCount - 1) {
                left = startBtn - 2 * showStep;
            } else {
                left = startBtn - showStep;
            }
        }

        // right border
        if (startBtn + showStep >= pageCount - 1) {
            right = pageCount;
        } else {
            if (startBtn == 0) {
                right = startBtn + 2 * showStep;
            } else {
                right = startBtn + showStep;
            }
        }

        function checkVisible (i) {
            // check if current button located between borders
            return i >= left && i <= right;
        }

        // window.location.origin
        for (var i = 0; i < pageCount; i++) {
            let btnStart = i * perpage;
            let btnText = i + 1;
            let btnVisible = checkVisible(i);
            let btnActive = i * perpage == start;
            let btnHref = window.location.origin +
                window.location.pathname +
                "?perpage=" + perpage +
                "&start=" + btnStart;

            let cName = "page-item ";
            if (btnActive) {
                cName += " active";
            }
            if (! btnVisible) {
                cName += " hidden";
            }
            btns.push(<li className = {cName} >
                <Link
                    className="page-link"
                    to = {btnHref}
                    data-start={btnStart}
                    onClick={(e) => {
                        e.preventDefault();
                        history.pushState({}, "", btnHref);
                        this.props.param.changePage(btnStart);
                    }}
                >
                    {btnText}
                </Link>
            </li>);
        }

        // move to first page
        let firstBtnClass = startBtn - showStep <= 0 ? "page-item disabled" : "page-item";
        let lastBtnClass = startBtn + showStep >= pageCount - 1 ? "page-item disabled" : "page-item";
        if (pageCount == showBtns) {
            firstBtnClass = lastBtnClass = "page-item disabled";
        }
        const firstBtn = <li className = {firstBtnClass}>
                <Link to="#" className="page-link">
                    <span>&laquo;</span>
                </Link>
            </li>
        // move to last page
        const lastBtn = <li className = {lastBtnClass}>
                <Link to="#" className="page-link">
                    <span>&raquo;</span>
                </Link>
            </li>

        btns.unshift(firstBtn);
        btns.push(lastBtn);

        return btns;
    }

    render () {
        let btns = this.getBtns();
        return (
            <div>
                <div>
                    {this.props.param.items}
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        {btns}
                    </ul>
                </nav>
            </div>
        )
    }
}
