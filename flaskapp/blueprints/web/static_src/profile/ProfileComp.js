import React from 'react'
import { connect } from 'react-redux'

import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'


class NumInfo extends React.Component {
    render () {
        return <div className="row">
            <div className="col-sm">
                <div className="card">
                    <div className="card-header">
                        <a href="/my-blogs">My blogs</a>
                    </div>
                    <div className="card-body">
                        {this.props.profile.countBlogs}
                    </div>
                </div>
            </div>

            <div className="col-sm">
                <div className="card">
                    <div className="card-header">
                        <a href="/friends">My friends</a>
                    </div>
                    <div className="card-body">
                        Friends : {this.props.profile.friends}
                        <br/>
                        Requests : {this.props.profile.friendRequests}
                        <br/>
                        My Requests : {this.props.profile.selfFriendRequests}
                        <br/>
                    </div>
                </div>
            </div>

            <div className="col-sm">
                <div className="card">
                    <div className="card-header">
                        <a href="/chat-list">My chats</a>
                    </div>
                    <div className="card-body">
                        {this.props.profile.countChats}
                    </div>
                </div>
            </div>
        </div>
    }
}

/**
 * Class with user info and for to edit profile
 * @param {string} login
 * @param {string} email
 */
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.profile.login,
            email: this.props.profile.email,
            edit: false,
        };
    }

    formSubmit (e) {
        e.preventDefault();
        this.props.dispatch(graphql({
            type: 'PROFILE_EDIT',
            login: this.state.login,
            email: this.state.email,
        }));
    }

    fieldChange (e) {
        let stateObj = {};
        stateObj[e.target.id] = e.target.value;
        this.setState(stateObj);
    }

    setMode (e) {
        this.setState({
            edit: ! this.state.edit,
        });
    }

    componentWillReceiveProps (newProps) {
        this.setState({
            login: newProps.profile.login,
            email: newProps.profile.email,
        });
    }

    render () {
        let infoClass = "";
        let formClass = "";
        if (this.state.edit) {
            infoClass = "hidden";
        } else {
            formClass = "hidden"
        }

        return <div>
            <div className="card">
                <div className="card-header">
                    <button className={"btn btn-primary " + formClass} onClick={::this.setMode} >
                        <i className="fa fa-user"></i>&nbsp;
                        View profile
                    </button>
                    &nbsp;
                    <button className={"btn btn-primary " + infoClass} onClick={::this.setMode} >
                        <i className="fa fa-cog"></i>&nbsp;
                        Edit profile
                    </button>
                </div>
                <div className="card-body">
                    <div className={infoClass}>
                        <div className="row">
                            <div className="col-2"><label>Login</label></div>
                            <div className="col-10">{this.state.login}</div>
                        </div>

                        <div className="row">
                            <div className="col-2"><label>Email</label></div>
                            <div className="col-10">{this.state.email}</div>
                        </div>
                    </div>

                    <div className={formClass}>
                        <form onSubmit={::this.formSubmit}>
                            <div className="form-group">
                                <label htmlFor="login">Login</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="login"
                                    placeholder="Login"
                                    value={this.state.login}
                                    onChange={::this.fieldChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={::this.fieldChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-save"></i>&nbsp;
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <br />
        </div>
    }
};


class ProfileComp extends React.Component {
    componentWillMount () {
        this.props.dispatch(graphql({
            type: 'PROFILE',
        }));
    }
    render () {
        let alertOpts = null;
        if (
            this.props.profile.status === 'error' ||
            this.props.profile.status === 'edit_error'
        ) {
            alertOpts = {
                className: 'danger',
                text: this.props.profile.error || this.props.profile.error
            }
        } else if (this.props.profile.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        } else if (this.props.profile.status === 'edit_success') {
            alertOpts = {
                className: 'success',
                text: 'The profile updated successfully',
            }
        }

        return <div>
            <AlertMessage opts={alertOpts} />
            <UserInfo profile={this.props.profile} dispatch={this.props.dispatch} />
            <NumInfo profile={this.props.profile} />
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}
ProfileComp = connect(mapStateToProps)(ProfileComp)

export default ProfileComp
