import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import { map } from 'lodash';
import { AlertMessage, PaginatorLayout } from '../helpers/component';

class ChatListComp extends React.Component {
    componentWillMount () {
        this.changePage(this.props.chatList.start)
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'CHAT_LIST',
            start: start, 
            perpage: this.props.chatList.perpage, 
        }));
    }

    getChatItems() {
        let items = map(this.props.chatList.chatPrivate, (chat) => {
            return <tr>
                <td>
                    {chat.userLogin}, {chat.friendLogin}
                </td>
                <td className="text-right">
                    <a href={"/chat-private/" + chat.linkId} className="btn btn-default" >
                        <span className="glyphicon glyphicon-envelope"></span>&nbsp;
                        Send message
                    </a>
                </td>
            </tr>
        });

        return <table className="table table-hover">
            <tbody>
                {items}
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
            start: this.props.chatList.start,
            perpage: this.props.chatList.perpage,
            count: this.props.chatList.count,
            items: this.getChatItems(),
            changePage: ::this.changePage,
        };

        return <div>
            <AlertMessage opts={alertOpts} />
            <PaginatorLayout param={pagerParam} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
ChatListComp = connect(mapStateToProps)(ChatListComp)

export default ChatListComp;