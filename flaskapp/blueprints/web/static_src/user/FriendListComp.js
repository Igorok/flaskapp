import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {map, isNumber} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';
import {Modal} from 'bootstrap'
import 'jquery'


class UserRemoveModal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user: null
        }
    }

    showRemove () {
        console.log('UserRemoveModal', this.props.show);

        if (this.props.show === true) {
            $('.user-remove-modal').modal('show');
        } else {
            $('.user-remove-modal').modal('hide');
        }
    }
    componentDidMount () {
        this.showRemove();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(
            'prevProps', prevProps,
            'prevState', prevState
        );

        this.showRemove();
    }

    render () {
        return <div className="user-remove-modal modal fade" tabindex="-1" role="dialog">
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">Modal title</h4>
                    </div>
                    <div className="modal-body">
                        <p>One fine body&hellip;</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

// one user row
class UserItemComp extends React.Component {
    /*
    friendRemove (e) {
        e.preventDefault();
        return this.props.friendRemove(this.props.user.id);
    }
    */
    showRemove (e) {
        e.preventDefault();

        console.log('UserItemComp showRemove');

        this.props.showRemove();
        // return this.props.friendRemove(this.props.user.id);


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
            showRemove: false
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

    /*
    friendRemove (id) {
        this.props.dispatch(graphql({
            type: 'FRIEND_REMOVE',
            id: id
        }));
    }
    */

    showRemove () {

        console.log('FriendListComp showRemove');

        this.setState({
            showRemove: true
        });
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
            <UserRemoveModal show={this.state.showRemove} />
        </div>

    }
}

const mapStateToProps = (state) => {
    return {...state}
}
FriendListComp = connect(mapStateToProps)(FriendListComp)

export default FriendListComp