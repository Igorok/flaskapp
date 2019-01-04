import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {map, isNumber} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';
import {UserRemoveModal, UserApproveModal} from './UserModal';


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

    friendRemove (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REMOVE',
            id: id
        }));
    }

    getUserItems () {
        const items = map(this.props.userList.users, user => {
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

*/





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


    showRemove (e) {
        e.preventDefault();
        return this.props.showRemove(this.props.user);
    }
    showAdd (e) {
        e.preventDefault();
        return this.props.showAdd(this.props.user);
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
        }
        // if this row sended request to current user
        else if (this.props.user.selfFriendId !== null) {
            friendBtn = <button className="btn btn-default" onClick={::this.showAdd} >
                <span className="glyphicon glyphicon-plus"></span>
                &nbsp;
                Approve friend
            </button>
        }
        // if current user sended request to current row
        else if (this.props.user.friendUserId !== null) {
            friendBtn = <button disabled className="btn btn-default" onClick={::this.showAdd} >
                <span className="glyphicon glyphicon-plus"></span>
                &nbsp;
                Add to friends
            </button>
        } else {
            friendBtn = <button className="btn btn-default" onClick={::this.showAdd} >
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
class UserListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.userList.start,
            users: this.props.userList.users,
            addUsr: null,
            rmUsr: null
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

    


    showAdd (u) {
        this.setState({addUsr: u});
    }
    showRemove (u) {
        this.setState({rmUsr: u});
    }

    cancelAdd (id) {
        this.setState({addUsr: null});
    }
    cancelRemove (id) {
        this.setState({rmUsr: null});
    }

    approveAdd (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REQUEST',
            id: id
        }));
        this.setState({addUsr: null});
    }

    approveRemove (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REMOVE',
            id: id
        }));
        this.setState({rmUsr: null});
    }

    getUserItems () {
        const items = map(this.props.userList.users, user => {
            return <UserItemComp
                user={user}
                showAdd={::this.showAdd}
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
            <UserApproveModal 
                user={this.state.addUsr} 
                cancelAdd={::this.cancelAdd}
                approveAdd={::this.approveAdd}
            />
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
UserListComp = connect(mapStateToProps)(UserListComp)

export default UserListComp
