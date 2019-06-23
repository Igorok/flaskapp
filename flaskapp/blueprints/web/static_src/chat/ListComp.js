import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import { map } from 'lodash';
import { AlertMessage, PaginatorLayout } from '../helpers/component';

import { Link } from 'react-router-dom';
import queryString from 'query-string';

class ChatListComp extends React.Component {
    constructor(props) {
        super(props);

        let search = queryString.parse(this.props.router.location.search);
        this.state = {
            start: search.start || 0,
            perpage: search.perpage || 6
        }
    }

    componentWillMount () {
        this.changePage()
    }

    changePage (start = this.state.start) {
        this.props.dispatch(graphql({
            type: 'CHAT_LIST',
            start: start,
            perpage: this.state.perpage,
        }));
        this.setState({start})
    }

    getChatItems() {
        return <table className="table">
            <tbody>
            {
                map(this.props.chatList.chatPrivate, (chat) => {
                    return <tr>
                        <td>
                            {chat.userLogin}, {chat.friendLogin}
                        </td>
                        <td className="text-right">
                            <Link to={"/chat-private/" + chat.linkId} className="btn btn-primary" >
                                <i class="fa fa-envelope"></i>&nbsp;
                                Send message
                            </Link>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    }

    render () {
        let alertOpts = null;

        if (this.props.chatList.status == 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.chatList.error
            }
        } else if (this.props.chatList.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }

        let pagerParam = {
            start: this.state.start,
            perpage: this.state.perpage,
            count: this.props.chatList.count,
            items: this.getChatItems(),
            changePage: ::this.changePage,
        };

        return <div>
            <div className="card">
                <div className="card-header">
                    <h5>Chats</h5>
                </div>
                <div className="card-body" style={{ minHeight: '500px' }}>
                    <AlertMessage opts={alertOpts} />
                    <table className="table">
                        <tbody>
                            <PaginatorLayout param={pagerParam} />
                        </tbody>
                    </table>
                </div>
            </div>
            <br />


        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        chatList: state.chatList,
        auth: state.auth,
        router: state.router
    }
}
ChatListComp = connect(mapStateToProps)(ChatListComp)

export default ChatListComp;
