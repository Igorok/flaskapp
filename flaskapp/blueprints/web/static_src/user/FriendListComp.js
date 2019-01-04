import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {map, isNumber} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';
import {UserRemoveModal, UserApproveModal} from './UserModal';


// one user row
class UserItemComp extends React.Component {
    showRemove (e) {
        e.preventDefault();
        this.props.showRemove(this.props.user);
    }

    render () {
        let textClass = this.props.user.online ? 'success' : 'active';
        let friendBtn = null;
        let msgBtn = null;
        // if both users sended friend requests
        if (
            this.props.user.selfFriendId !== null &&
            this.props.user.friendUserId !== null
        ) {
            friendBtn = <button className="btn btn-default" onClick={::this.showRemove} >
                <span className="glyphicon glyphicon-minus"></span>
                &nbsp;
                Remove from friends
            </button>
            msgBtn = <a className="btn btn-default" href={"/chat-private/" + this.props.user.id}>
                <span className="glyphicon glyphicon-envelope"></span>
                &nbsp;
                Send message
            </a>
        } else {
            friendBtn = <button className="btn btn-default" >
                <span className="glyphicon glyphicon-plus"></span>
                &nbsp;
                Add to friends
            </button>
        }

        return <tr className={textClass}>
            <td>
                <span className="glyphicon glyphicon-user"></span>
                &nbsp;
                <span>{this.props.user.login}</span>
            </td>
            <td>
                {this.props.user.dtActive}
            </td>
            <td className="text-right">
                {friendBtn}
                &nbsp;
                {msgBtn}
            </td>
        </tr>
    }
}

// list of friends
class FriendListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.friendList.start,
            friends: this.props.friendList.friends,
            rmUsr: null
        }
    }

    componentWillMount () {
        this.changePage(this.props.friendList.start);
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'FRIEND_LIST',
            start: start,
            perpage: this.props.friendList.perpage,
        }));
    }

    approveRemove (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REMOVE',
            id: id
        }));
        this.setState({rmUsr: null});
    }
    cancelRemove (id) {
        this.setState({rmUsr: null});
    }

    showRemove (u) {
        this.setState({rmUsr: u});
    }

    getUserItems () {
        const items = map(this.props.friendList.friends, user => {
            return <UserItemComp
                user={user}
                showRemove={::this.showRemove}
            />
        });

        return <table className="table table-hover">
            <tbody>
                {items}
            </tbody>
        </table>
    }

    render () {
        let alertOpts = null;
        let friends = null;

        if (this.props.friendList.status == 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.friendList.error
            }
        } else if (this.props.friendList.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }

        let pagerParam = {
            start: this.props.friendList.start,
            perpage: this.props.friendList.perpage,
            count: this.props.friendList.count,
            items: this.getUserItems(),
            changePage: ::this.changePage,
        };

        return <div>
            <AlertMessage opts={alertOpts} />
            <PaginatorLayout param={pagerParam} />
            <UserRemoveModal 
                user={this.state.rmUsr} 
                cancelRemove={::this.cancelRemove}
                approveRemove={::this.approveRemove}
            />
        </div>

    }
}


const mapStateToProps = (state) => {
    return {...state}
}
FriendListComp = connect(mapStateToProps)(FriendListComp)

export default FriendListComp