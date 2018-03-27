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

export class SideNav extends React.Component {
    render () {
        let profileItem = null;
        let userItem = null;
        let chatItem = null;

        if (this.props.auth.isAuthenticated) {
            profileItem = <li role="presentation">
                <a href="/profile">
                    <span className="glyphicon glyphicon-home"></span>
                    &nbsp;&nbsp;Profile
                    ({this.props.auth.login})
                </a>
            </li>
            userItem = <li role="presentation">
                <a href="/users"><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Users</a>
            </li>
            chatItem = <li role="presentation">
                <a href="/chats"><span className="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;Chats</a>
            </li>
        }

        return <ul className="nav nav-pills nav-stacked">
            <li role="presentation">
                <a href="/"><span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;&nbsp;About</a>
            </li>
            <li role="presentation">
                <a href="/blogs"><span className="glyphicon glyphicon-bookmark"></span>&nbsp;&nbsp;Blogs</a>
            </li>
            {profileItem}
            {userItem}
            {chatItem}
            
        </ul>
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
    showDropdown () {
        $('.dropdown-toggle').dropdown('toggle');
    }
    render () {
        let profileItem = null;
        let userItem = null;

        if (this.props.auth.isAuthenticated) {
            profileItem = <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a 
                        href="#" className="dropdown-toggle" data-toggle="dropdown" 
                        role="button" aria-haspopup="true" aria-expanded="false"
                        onClick={::this.showDropdown}
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
                            <a href={"/blogs&userId=" + this.props.auth.id}>My blogs</a>
                        </li>
                        <li>
                            <a href="/blog-edit/-1">Add blog</a>
                        </li>
                        <li>
                            <a href="/friends">Friends</a>
                        </li>
                        <li>
                            <a href="/chats">Chats</a>
                        </li>
                        
                    </ul>
                </li>
            </ul>

            userItem = <li role="presentation">
                <a href="/users"><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Users</a>
            </li>
        }

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
                        <li className="active">
                            <a href="/"><span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;&nbsp;About</a>
                        </li>
                        <li >
                            <a href="/blogs"><span className="glyphicon glyphicon-bookmark"></span>&nbsp;&nbsp;Blogs</a>
                        </li>
                        {userItem}
                    </ul>
                    {profileItem}
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



