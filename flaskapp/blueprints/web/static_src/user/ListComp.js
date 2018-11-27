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

    getOnlineIcon (online) {
        let clName = 'glyphicon glyphicon-user ';
        if (online) {
            clName += 'text-success';
        } else {
            clName += 'text-warning';
        }
        return <span className={clName}></span>
    }
    getUserItems () {
        var self = this;
        const items = map(this.props.userList.users, user => {

            /*
            id = graphene.ID()
            login = graphene.String()
            email = graphene.String()
            friend = graphene.Int()
            online = graphene.Boolean()
            dtActive = graphene.String()
            */

            return <div className="row">
                <div className="col-md-4">
                    {self.getOnlineIcon(user.online)}&nbsp;
                    {user.login}&nbsp;
                    {user.dtActive}
                </div>
            </div>
        });
        return items;





        /*

        let chunkedItems = chunk(this.props.blogList.blogs, 3);
        let blogs = map(chunkedItems, blogs => {
            let partition = map(blogs, blog => {
                return <div className="col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a href = {"/blog/" + blog.id}>
                                    {blog.title}
                                </a>
                            </h4>
                        </div>
                        <div className="panel-body">
                            {blog.text}
                        </div>
                        <div className="panel-footer">
                            <p>
                                <span className="glyphicon glyphicon-user"></span>&nbsp;
                                {blog.userName}
                            </p>
                            <p>
                                <span className="glyphicon glyphicon-time"></span>&nbsp;
                                {blog.date}
                            </p>
                        </div>
                    </div>
                </div> 
            });

            return <div className="row">{partition}</div>
        });

        return blogs;

        */
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

        /*

        if (this.props.blogList.status == 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.blogList.error
            }
        } else if (this.props.blogList.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }

        let pagerParam = {
            start: this.props.blogList.start,
            perpage: this.props.blogList.perpage,
            count: this.props.blogList.count,
            items: this.getBlogItems(),
            changePage: ::this.changePage,
        };

        */


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