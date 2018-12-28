import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {map, isNumber} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';


// one user row
class UserItemComp extends React.Component {
    friendRequest (e) {
        e.preventDefault();
        return this.props.friendRequest(this.props.user.id);
    }
    friendRemove (e) {
        e.preventDefault();
        return this.props.friendRemove(this.props.user.id);
    }
    render () {
        let textClass = this.props.user.online ? 'success' : 'active';
        let friendBtn = null;
        let msgBtn = null
        // if both users sended friend requests
        if (
            this.props.user.selfFriendId !== null &&
            this.props.user.friendUserId !== null
        ) {
            friendBtn = <button className="btn btn-default" onClick={::this.friendRemove} >
                <span className="glyphicon glyphicon-minus"></span>
                &nbsp;
                Remove from friends
            </button>
            msgBtn = <a className="btn btn-default" href={"/chat-private/" + this.props.user.id}>
                <span className="glyphicon glyphicon-envelope"></span>
                &nbsp;
                Send message
            </a>
        }
        // if this row sended request to current user
        else if (this.props.user.selfFriendId !== null) {
            friendBtn = <button className="btn btn-default" onClick={::this.friendRequest} >
                <span className="glyphicon glyphicon-plus"></span>
                &nbsp;
                Approve friend
            </button>
        }
        // if current user sended request to current row
        else if (this.props.user.friendUserId !== null) {
            friendBtn = <button disabled className="btn btn-default" onClick={::this.friendRequest} >
                <span className="glyphicon glyphicon-plus"></span>
                &nbsp;
                Add to friends
            </button>
        } else {
            friendBtn = <button className="btn btn-default" onClick={::this.friendRequest} >
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

    friendRequest (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REQUEST',
            id: id
        }));
    }

    friendRemove (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REMOVE',
            id: id
        }));
    }

    getUserItems () {
        const items = map(this.props.friendList.friends, user => {
            return <UserItemComp
                user={user}
                friendRequest={::this.friendRequest}
                friendRemove={::this.friendRemove}
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

            <p>qwe</p>

            // <PaginatorLayout param={pagerParam} />
        </div>

    }
}
const mapStateToProps = (state) => {
    return {...state}
}
FriendListComp = connect(mapStateToProps)(FriendListComp)

export default FriendListComp




/*

// one user row
class UserItemComp extends React.Component {
    friendRequest (e) {
        e.preventDefault();
        return this.props.friendRequest(this.props.user.id);
    }
    friendRemove (e) {
        e.preventDefault();
        return this.props.friendRemove(this.props.user.id);
    }
    render () {
        let textClass = this.props.user.online ? 'success' : 'active';
        let friendBtn = null;
        let msgBtn = null
        // if both users sended friend requests
        if (
            this.props.user.selfFriendId !== null &&
            this.props.user.friendUserId !== null
        ) {
            friendBtn = <button className="btn btn-default" onClick={::this.friendRemove} >
                <span className="glyphicon glyphicon-minus"></span>
                &nbsp;
                Remove from friends
            </button>
            msgBtn = <a className="btn btn-default" href={"/chat-private/" + this.props.user.id}>
                <span className="glyphicon glyphicon-envelope"></span>
                &nbsp;
                Send message
            </a>
        }
        // if this row sended request to current user
        else if (this.props.user.selfFriendId !== null) {
            friendBtn = <button className="btn btn-default" onClick={::this.friendRequest} >
                <span className="glyphicon glyphicon-plus"></span>
                &nbsp;
                Approve friend
            </button>
        }
        // if current user sended request to current row
        else if (this.props.user.friendUserId !== null) {
            friendBtn = <button disabled className="btn btn-default" onClick={::this.friendRequest} >
                <span className="glyphicon glyphicon-plus"></span>
                &nbsp;
                Add to friends
            </button>
        } else {
            friendBtn = <button className="btn btn-default" onClick={::this.friendRequest} >
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

// list of users
class friendListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.friendList.start,
            users: this.props.friendList.users,
        }
    }

    componentWillMount () {
        this.changePage(this.props.friendList.start);
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'USER_LIST',
            start: start,
            perpage: this.props.friendList.perpage,
        }));
    }

    friendRequest (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REQUEST',
            id: id
        }));
    }

    friendRemove (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REMOVE',
            id: id
        }));
    }

    getUserItems () {
        const items = map(this.props.friendList.users, user => {
            return <UserItemComp
                user={user}
                friendRequest={::this.friendRequest}
                friendRemove={::this.friendRemove}
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
        let users = null;

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
        </div>

    }
}
const mapStateToProps = (state) => {
    return {...state}
}
friendListComp = connect(mapStateToProps)(friendListComp)

export default friendListComp

*/
