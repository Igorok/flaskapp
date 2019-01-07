import React from 'react'
import { connect } from 'react-redux'
import {Alert, Dropdown} from 'bootstrap'
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
        let formClass = 'form-group';
        if (this.state.isValid === true) {
            formClass += ' has-success';
        } else if (this.state.isValid === false) {
            formClass += ' has-error';
        }

        return <div>
            <div className='form-inline'>
                <div className={formClass}>
                    <label htmlFor="sum" className='control-label'>
                        {this.state.v1} + {this.state.v2} =
                        &nbsp;&nbsp;
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="sum"
                        placeholder="Sum"
                        onChange={::this.changeSum}
                    />
                </div>
            </div>
            <br />
        </div>
    }
}


class Header extends React.Component {
    // componentDidMount () {
    //     $('.dropdown-toggle').dropdown();
    // }


    render () {
        let profileItem = null;
        let userItem = null;

        if (this.props.auth.isAuthenticated) {
            profileItem = <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a
                        href="#" 
                        className="dropdown-toggle" 
                        data-toggle="dropdown"
                        role="button" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                        <span className="glyphicon glyphicon-home"></span>&nbsp;&nbsp;
                        <strong>{this.props.auth.login}</strong>&nbsp;&nbsp;
                        <span className="caret"></span>
                    </a>

                    <ul className="dropdown-menu">
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <a href="/my-blogs">My blogs</a>
                        </li>
                        <li>
                            <a href="/blog-edit/-1">Add blog</a>
                        </li>
                        <li>
                            <a href="/friends">Friends</a>
                        </li>
                        <li>
                            <a href="/chat-list">Chats</a>
                        </li>

                    </ul>
                </li>
            </ul>

            userItem = <li 
                role="presentation"
                className={window.localParams.page == 'user' ? 'active' : ''}
                >
                <a href="/users"><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Users</a>
            </li>
        }
        /*
        return <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">FlaskApp</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className={window.localParams.page == 'about' ? 'active' : ''}>
                            <a href="/"><span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;&nbsp;About</a>
                        </li>
                        <li className={window.localParams.page == 'blog' ? 'active' : ''}>
                            <a href="/blogs"><span className="glyphicon glyphicon-bookmark"></span>&nbsp;&nbsp;Blogs</a>
                        </li>
                        {userItem}
                    </ul>
                    {profileItem}
                </div>
            </div>
        </nav>
        */


        return <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">FlaskApp</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    }
};



/**
 * function to render layout
 * @param {Class} opts.comp - React.Component that need to render
 * @param {Boolean} opts.forAuth - this component only for authenticated users
 */
export function layout (opts) {
    let Component = opts.comp;
    let forAuthenticated = opts.forAuthenticated;

    class Layout extends React.Component {
        componentWillMount() {
            this.checkAuth(this.props.auth)
        }
        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.auth)
        }
        checkAuth(auth) {
            // if this page only for authenticated users and the storage has no isAuthenticated
            if (forAuthenticated && ! auth.isAuthenticated) {
                return window.location = '/';
            }
        }
        render() {
            return (
                <div>
                    <Header auth={this.props.auth} />
                    <div className="container">
                        <Component />
                    </div>
                </div>
            )
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

            let cName = "";
            if (btnActive) {
                cName += "active";
            }
            if (! btnVisible) {
                cName += "hidden";
            }
            btns.push(<li className = {cName} >
                <a
                    href = {btnHref}
                    data-start={btnStart}
                    onClick={(e) => {
                        e.preventDefault();
                        history.pushState({}, "", btnHref);
                        this.props.param.changePage(btnStart);
                    }}
                >
                    {btnText}
                </a>
            </li>);
        }

        // move to first page
        let firstBtnClass = startBtn - showStep <= 0 ? "disabled" : "";
        let lastBtnClass = startBtn + showStep >= pageCount - 1 ? "disabled" : "";
        if (pageCount == showBtns) {
            firstBtnClass = lastBtnClass = "disabled";
        }
        const firstBtn = <li className = {firstBtnClass}>
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        // move to last page
        const lastBtn = <li className = {lastBtnClass}>
                <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
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
