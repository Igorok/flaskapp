import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import 'jquery'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'


import io from 'socket.io-client'

class UsersComp extends React.Component {
    render () {
        let users = null;
        if (this.props.users) {
            users = map(this.props.users, u => {
                let onlineClass = 'badge ';
                if (u.online) {
                    onlineClass += 'badge-success';
                } else {
                    onlineClass += 'badge-secondary';
                }
                return <span className={onlineClass}>{u.login}</span>
            });
        }

        return <div className='h5 user-list'>{users}</div>
    }
}

class MessagesComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mHeight: 100
        }
    }

    scrollBottom () {
        let h = $('.table-hover').height();
        $('.message-list').scrollTop(h);
    }

    changeHeinght () {
        let wHeight = $(window).height();
        let mHeight = wHeight - 56 -20 -
            48 - 20 -
            25 - 10 -
            20 -
            86 - 20
            ;

        this.setState({mHeight: mHeight});
    }

    componentDidMount () {
        this.changeHeinght();
        this.scrollBottom();
        $(window).on('resize', () => {
            this.changeHeinght();
        })
    }

    componentDidUpdate() {
        this.scrollBottom();
    }

    render () {
        let style = {
            height: this.state.mHeight + 'px',
        };

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
        return <div className='message-list' style={style}>
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
        self.socket = io.connect(window.location.origin);

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
        if (e.target.value && e.target.value.length) {
            this.setState({msg: e.target.value});
        }

        if (e.which === 13 && this.state.msg) {
            this.socket.emit('messagePrivate', {
                token: this.props.auth.token,
                chatId: this.props.chatPrivate.id,
                text: this.state.msg
            });

            this.setState({msg: null});

            this.props.dispatch({
                type: 'PRIVATE_MSG_SEND'
            });
        }
    }

    changeMsg (e) {
        this.setState({
            msg: e.target.value
        });
    }

    render () {
        let alertOpts = null;
        let formDisabled = false;

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
        } else if (this.props.chatPrivate.status === 'send_message') {
            formDisabled = true;
        } else if (this.props.chatPrivate.status === 'success') {
            formDisabled = false;
        }

        return <div className='chat-page'>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><a href="/users">Users</a></li>
                    <li className="breadcrumb-item active">Chat</li>
                </ol>
            </nav>

            <UsersComp users={this.props.chatPrivate.users} />
            <MessagesComp messages={this.props.chatPrivate.messages}/>
            <AlertMessage opts={alertOpts} />

            <textarea
                className="form-control"
                rows="3"

                value={this.state.msg}
                onKeyPress={::this.sendMsg}
                onChange={::this.changeMsg}
                disabled={formDisabled}
            ></textarea>
            <br />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
PrivateComp = connect(mapStateToProps)(PrivateComp);

export default PrivateComp;
