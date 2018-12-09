import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {forEach, chunk, map} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';

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

    getUserItems () {
        var self = this;
        const items = map(this.props.userList.users, user => {

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
                    <button className="btn btn-default">
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