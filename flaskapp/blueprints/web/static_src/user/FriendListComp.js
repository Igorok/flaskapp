import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {map, isNumber} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';
import {UserRemoveModal, UserApproveModal} from './UserModal';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

// one user row
class UserItemComp extends React.Component {
    showRemove (e) {
        e.preventDefault();
        this.props.showRemove(this.props.user);
    }

    render () {
        let actClass = this.props.user.online ? "badge badge-success" : '';
        let friendBtn = null;
        let msgBtn = null;
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
        } else {
            friendBtn = <button className="btn btn-primary" >
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
}

// list of friends
class FriendListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: this.props.friendList.friends,
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
            type: 'FRIEND_LIST',
            start: start,
            perpage: this.state.perpage,
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
        return <table className="table table-hover user-table">
            <tbody>
            {
                map(this.props.friendList.friends, user => {
                    return <UserItemComp
                        user={user}
                        showRemove={::this.showRemove}
                    />
                })
            }
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
            start: this.state.start,
            perpage: this.state.perpage,
            count: this.props.friendList.count,
            items: this.getUserItems(),
            changePage: ::this.changePage,
        };

        return <div>
            <div className="card">
                <div className="card-header">
                    <h5>Friends</h5>
                </div>
                <div className="card-body" style={{minHeight: '500px'}}>
                    <AlertMessage opts={alertOpts} />
                    <PaginatorLayout param={pagerParam} />
                </div>
            </div>
            <br />

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
        friendList: state.friendList,
        router: state.router
    }
}
FriendListComp = connect(mapStateToProps)(FriendListComp)

export default FriendListComp
