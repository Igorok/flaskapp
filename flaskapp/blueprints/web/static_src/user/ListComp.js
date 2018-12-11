import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {map, isNumber} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';




/*
    one user row


'selfFriendId', # friend for whom did send request this user
'friendUserId'
 */
class UserItemComp extends React.Component {
    friendRequest (e) {
        e.preventDefault();
        return this.props.friendRequest(this.props.user.id);
    }
    render () {
        let textClass = this.props.user.online ? 'success' : 'active';
        let friendBtn = null;
        // if both users sended friend requests
        if (
            this.props.user.selfFriendId !== null &&
            this.props.user.friendUserId !== null
        ) {
            friendBtn = <button className="btn btn-default" onClick={::this.friendRequest} >
                <span className="glyphicon glyphicon-minus"></span>
                &nbsp;
                Remove from friends
            </button>
        }
        // if this row sended request to current user
        else if (this.props.user.selfFriendId !== null) {
            friendBtn = <button className="btn btn-default" onClick={::this.friendRequest} >
                <span className="glyphicon glyphicon-minus"></span>
                &nbsp;
                Approve friend
            </button>
        }
        // if current user sended request to current row
        else if (this.props.user.friendUserId !== null) {
            friendBtn = <button disabled className="btn btn-default" onClick={::this.friendRequest} >
                <span className="glyphicon glyphicon-minus"></span>
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
                <button className="btn btn-default">
                    <span className="glyphicon glyphicon-envelope"></span>
                    &nbsp;
                    Send message
                </button>
            </td>
        </tr>
    }
}

// list of users
class UserListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.userList.start,
            users: this.props.userList.users,
        }
    }

    componentWillMount () {
        this.changePage(this.props.userList.start);
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'USER_LIST',
            start: start,
            perpage: this.props.userList.perpage,
        }));
    }

    friendRequest (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REQUEST',
            id: id
        }));
    }

    getUserItems () {
        const items = map(this.props.userList.users, user => {
            return <UserItemComp
                user={user}
                friendRequest={::this.friendRequest}
                />
        });

        return <table className="table table-hover">
            <tbody>
                {items}
            </tbody>
        </table>
    }

    /*

    getUserItems () {
        var self = this;
        const items = map(this.props.userList.users, user => {
            function friendRequest (e) {
                e.preventDefault();

                self.props.dispatch(graphql({
                    type: 'FRIEND_REQUEST',
                    id: user.id
                }));
            }

            let textClass = user.online ? 'success' : 'active';
            return <tr className={textClass}>
                <td>
                    <span className="glyphicon glyphicon-user"></span>
                    &nbsp;
                    <span>{user.login}</span>
                </td>
                <td>
                    {user.dtActive}
                </td>
                <td className="text-right">
                    <button className="btn btn-default" onClick={friendRequest} >
                        <span className="glyphicon glyphicon-plus"></span>
                        &nbsp;
                        Add to friend
                    </button>
                    &nbsp;
                    <button className="btn btn-default">
                        <span className="glyphicon glyphicon-envelope"></span>
                        &nbsp;
                        Send message
                    </button>
                </td>
            </tr>
        });

        return <table className="table table-hover">
            <tbody>
                {items}
            </tbody>
        </table>
    }

     */


    render () {
        let alertOpts = null;
        let users = null;

        if (this.props.userList.status == 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.userList.error
            }
        } else if (this.props.userList.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }

        let pagerParam = {
            start: this.props.userList.start,
            perpage: this.props.userList.perpage,
            count: this.props.userList.count,
            items: this.getUserItems(),
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
UserListComp = connect(mapStateToProps)(UserListComp)

export default UserListComp
