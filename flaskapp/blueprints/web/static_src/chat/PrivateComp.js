import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'


import io from 'socket.io-client'

class UsersComp extends React.Component {
    render () {
        let users = null;
        if (this.props.users) {
            users = map(this.props.users, u => {
                let onlineClass = 'label ';
                if (u.online) {
                    onlineClass += 'label-success';
                } else {
                    onlineClass += 'label-default';
                }
                return <span className={onlineClass}>{u.login}</span>
            });
        }

        return <div className='h4 user-list'>{users}</div>
    }
}

class MessagesComp extends React.Component {
    render () {
        let messages = null;
        if (this.props.messages) {
            messages = map(this.props.messages, m => {
                return <tr>
                    <td>{m.userLogin}</td>
                    <td>{m.text}</td>
                    <td className='text-right'>{m.date}</td>
                </tr>
            });
        }
        return <div>
            <table className="table table-hover">
                <tbody>
                    {messages}
                </tbody>
            </table>
        </div>
    }
}

class PrivateComp extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        self.props = self.props || {};
        self.socket = io.connect('http://' + document.domain + ':' + location.port);

        self.state = {
            msg: null
        };


        self.socket.on('connect', () => {
            self.socket.emit('joinPrivateGroup', {
                token: self.props.auth.token,
                friendId: self.props.chatPrivate.friendId
            });
        });

        self.socket.on('joinPrivateGroup', (r) => {
            self.props.dispatch({
                type: 'PRIVATE_JOIN_SUCCESS',
                id: r.id,
                userId: r.userId,
                friendId: r.friendId,
                users: r.users,
                messages: r.messages,
                date: r.date
            });
        });

        self.socket.on('messagePrivate', (r) => {
            self.setState({msg: ''});
            if (! r) {
                return;
            }
            self.props.dispatch({
                type: 'PRIVATE_MSG_SUCCESS',
                ...r
            });
        });

        self.socket.on('error', (e) => {
            self.props.dispatch({
                type: 'ERROR',
                error: e && e.error ? e.error : 'Shit happened!'
            });
        });
    }

    sendMsg (e) {
        e.preventDefault();
        if (this.state.msg === null) {
            return;
        }
        this.socket.emit('messagePrivate', {
            token: this.props.auth.token,
            chatId: this.props.chatPrivate.id,
            text: this.state.msg
        });

        this.props.dispatch({
            type: 'PRIVATE_MSG_SEND'
        });

    }
    changeMsg (e) {
        this.setState({
            msg: e.target.value
        });
    }

    render () {

        let alertOpts = null;

        if (this.props.chatPrivate.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.chatPrivate.error || 'Error, wrong post data'
            }
        } else if (this.props.chatPrivate.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }

        return <div className='chat-page'>
            <ol className="breadcrumb">
                <li><a href="/users">Users</a></li>
                <li className="active">Chat</li>
            </ol>

            <AlertMessage opts={alertOpts} />
            <UsersComp users={this.props.chatPrivate.users} />
            <MessagesComp messages={this.props.chatPrivate.messages} />

            <form className='chat-form' onSubmit={::this.sendMsg} >
                <div className="row">
                    <div className="col-md-10">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={this.state.msg}
                            onChange={::this.changeMsg}
                        ></textarea>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-default" >
                            <span className="glyphicon glyphicon-send"></span>
                        </button>
                    </div>
                </div>
            </form>

        </div>
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
PrivateComp = connect(mapStateToProps)(PrivateComp);

export default PrivateComp;