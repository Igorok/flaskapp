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
            let className = 'alert alert-' + this.props.opts.className;
            tpl = <div className={className} role='alert'>
                <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
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
                <label htmlFor='sum' className='control-label'>
                    {this.state.v1} + {this.state.v2} =
                    &nbsp;&nbsp;
                </label>
                <input
                    type='number'
                    className={inputClass}
                    id='sum'
                    placeholder='Sum'
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
            profileItem = <div className='nav-item dropdown'>
                <button class='btn btn-primary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    {this.props.auth.login}
                </button>
                <div className='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
                    <Link className='dropdown-item' to='/profile'>Profile</Link>
                    <Link className='dropdown-item' to='/my-blogs'>My blogs</Link>
                    <Link className='dropdown-item' to='/blog-edit/-1'>Add blog</Link>
                    <Link className='dropdown-item' to='/friends'>Friends</Link>
                    <Link className='dropdown-item' to='/chat-list'>Chats</Link>
                    <Link className='dropdown-item' to='#' onClick={::this.logout}>Logout</Link>
                </div>
            </div>

            userItem = <li className={window.localParams.page == 'user' ? 'nav-item active' : 'nav-item'}>
                <Link className='nav-link' to='/users'>
                    <i className='fa fa-users'></i>&nbsp;
                    Users
                    <span className='sr-only'>(current)</span>
                </Link>
            </li>
        }

        return <nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-primary'>
            <Link className='navbar-brand' to='#'>FlaskApp</Link>

            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav mr-auto'>

                    <li className={window.localParams.page == 'about' ? 'nav-item active' : 'nav-item'}>
                        <Link className='nav-link' to='/'>
                            <i className='fa fa-home'></i>&nbsp;
                            About
                            <span className='sr-only'>(current)</span>
                        </Link>
                    </li>
                    <li className={window.localParams.page == 'blog' ? 'nav-item active' : 'nav-item'}>
                        <Link className='nav-link' to='/blogs'>
                            <i class='fa fa-bookmark'></i>&nbsp;
                            Blogs
                            <span className='sr-only'>(current)</span>
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
            if (opts.forAuth && ! auth.isAuthenticated) {
                // return window.location = '/';
                return this.props.history.push('/');
            }
            // for not authorized users, login, registration
            else if (opts.forNotAuth && auth.isAuthenticated) {
                return this.props.history.push('/');
            }

        }
        render() {
            return <div class='container-fluid'>
                <Header auth={this.props.auth} logout={::this.logout} />
                <Component {...this.props.match.params} history={ this.props.history } />
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
    getButtons () {
        // received params
        const maxLinkCount = 5;
        const start = this.props.param.start ? parseInt(this.props.param.start) : 0;
        const perpage = this.props.param.perpage ? parseInt(this.props.param.perpage) : 10;
        const count = this.props.param.count ? parseInt(this.props.param.count) : 0;
        
        const pageCount = Math.ceil(count / perpage);

        const getButton = (i) => {
            let linkStart = i * perpage;
            let btnHref = window.location.pathname +
                '?perpage=' + perpage +
                '&start=' + linkStart;

            return <li className={ 'page-item' + (linkStart == start ? ' active' : '') }>
                <Link
                    className='page-link'
                    to={ btnHref }
                    onClick={(e) => {
                        e.preventDefault();
                        history.pushState({}, '', btnHref);
                        this.props.param.changePage(linkStart);
                    }}
                >
                    { i + 1 }
                </Link>
            </li>
        }

        let btnArr = [];
        // possible to show all of buttons
        if (pageCount <= maxLinkCount) {
            for (let i = 0; i < pageCount; i++) {
                btnArr.push(getButton(i));
            }
        } else {
            // detect index of link, and position between start and end
            let linkIndex = Math.ceil(start / perpage);
            let halfOfLinks = Math.floor(maxLinkCount / 2);

            let leftIndex = linkIndex - halfOfLinks;
            let rightIndex = linkIndex + halfOfLinks;

            // if left index less 0, we can start from 0
            if (leftIndex <= 0) {
                leftIndex = 0;
                rightIndex = maxLinkCount - 1;

                for (let i = leftIndex; i < rightIndex; i++) {
                    btnArr.push(getButton(i));
                }
                btnArr.push(<li className='page-item'>
                    <Link className='page-link disabled' to='#'>...</Link>
                </li>);
                btnArr.push(getButton(pageCount - 1));
            } 
            // if right index biger that end, we can start from end
            else if (rightIndex >= pageCount - 1) {
                leftIndex = pageCount - (maxLinkCount - 1);
                rightIndex = pageCount;

                btnArr.push(getButton(0));
                btnArr.push(<li className='page-item'>
                    <Link className='page-link disabled' to='#'>...</Link>
                </li>);
                
                for (let i = leftIndex; i < rightIndex; i++) {
                    btnArr.push(getButton(i));
                }
            }
            // in other case, we need to put start link in center, and show start and end
            else {
                leftIndex = linkIndex - halfOfLinks;
                rightIndex = linkIndex + halfOfLinks;
                
                btnArr.push(getButton(0));
                btnArr.push(<li className='page-item'>
                    <Link className='page-link disabled' to='#'>...</Link>
                </li>);

                for (let i = leftIndex + 1; i < rightIndex + 1; i++) {
                    btnArr.push(getButton(i));
                }

                btnArr.push(<li className='page-item'>
                    <Link className='page-link disabled' to='#'>...</Link>
                </li>);
                btnArr.push(getButton(pageCount-1));
            }

        }

        return btnArr;
    }

    render () {
        return (
            <div>
                <div>
                    {this.props.param.items}
                </div>
                <nav aria-label='Page navigation'>
                    <ul className='pagination'>
                        { this.getButtons() }
                    </ul>
                </nav>
            </div>
        )
    }
}
