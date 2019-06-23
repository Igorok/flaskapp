import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {map, isNumber} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';
import { UserRemoveModal, UserApproveModal } from './UserModal';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

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
        let actClass = this.props.user.online ? 'badge badge-success' : 'badge badge-secondary';
        let friendBtn = null;
        let msgBtn = null
        // if both users sended friend requests
        if (
            this.props.user.selfFriendId !== null &&
            this.props.user.friendUserId !== null
        ) {
            friendBtn = <button className="btn btn-primary" onClick={::this.showRemove} >
                <i class="fa fa-minus"></i>
                &nbsp;
                Remove from friends
            </button>
            msgBtn = <Link to={"/chat-private/" + this.props.user.id} className="btn btn-primary" >
                <i class="fa fa-envelope"></i>
                &nbsp;
                Send message
            </Link>
        }
        // if this row sended request to current user
        else if (this.props.user.selfFriendId !== null) {
            friendBtn = <button className="btn btn-primary" onClick={::this.showAdd} >
                <i class="fa fa-plus"></i>
                &nbsp;
                Approve friend
            </button>
        }
        // if current user sended request to current row
        else if (this.props.user.friendUserId !== null) {
            friendBtn = <button disabled className="btn btn-primary" onClick={::this.showAdd} >
                <i class="fa fa-plus"></i>
                &nbsp;
                Add to friends
            </button>
        } else {
            friendBtn = <button className="btn btn-primary" onClick={::this.showAdd} >
                <i class="fa fa-plus"></i>
                &nbsp;
                Add to friends
            </button>
        }

        return <tr>
            <td>
                <span class={actClass}>
                    <i class="fa fa-user"></i>
                    &nbsp;
                    {this.props.user.login}
                </span>
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
};

// list of users
class UserListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.userList.users,
            addUsr: null,
            rmUsr: null
        }

        let search = queryString.parse(this.props.router.location.search);
        this.state.start = search.start || 0;
        this.state.perpage = search.perpage || 6;
    }

    componentWillMount () {
        this.changePage();
    }

    changePage (start = this.state.start) {
        this.props.dispatch(graphql({
            type: 'USER_LIST',
            start: start,
            perpage: this.state.perpage,
        }));
        this.setState({start})
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
        return <table className="table table-hover user-table">
            <tbody>
            {
                map(this.props.userList.users, user => {
                    return <UserItemComp
                        user={user}
                        showAdd={::this.showAdd}
                        showRemove={::this.showRemove}
                    />
                })
            }
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
            start: this.state.start,
            perpage: this.state.perpage,
            count: this.props.userList.count,
            items: this.getUserItems(),
            changePage: ::this.changePage,
        };

        return <div>
            <div className="card">
                <div className="card-header">
                    <h5>Users</h5>
                </div>
                <div className="card-body" style={{minHeight: '500px'}}>
                    <AlertMessage opts={alertOpts} />

                    <PaginatorLayout param={pagerParam} />
                </div>
            </div>
            <br />

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
    return {
        auth: state.auth,
        userList: state.userList,
        router: state.router
    }
}
UserListComp = connect(mapStateToProps)(UserListComp)

export default UserListComp
