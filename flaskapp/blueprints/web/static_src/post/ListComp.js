import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {forEach, chunk, map} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';

class BlogComp extends React.Component {
    render () {
        var self = this;
        var tpl = null;
        if (this.props.blog) {

            tpl = <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            {this.props.blog.title}
                        </h4>
                    </div>
                    <div className="panel-body">
                        {this.props.blog.text}
                        {/* <div dangerouslySetInnerHTML={{__html: this.props.blog.text}} /> */}
                    </div>
                    <div className="panel-footer">
                        <p>
                            <span className="glyphicon glyphicon-user"></span>&nbsp;
                            {this.props.blog.userName}
                            &nbsp;|&nbsp;
                            <span className="glyphicon glyphicon-time"></span>&nbsp;
                            {this.props.blog.date}
                        </p>
                    </div>
                </div>
        }
        return tpl;
    }
}





class ListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.postList.start,
            blog: this.props.postList.blog,
            posts: this.props.postList.posts,
        }
    }

    componentWillMount () {
        this.changePage();
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'BLOG_DETAIL',
            start: start,
            perpage: this.props.postList.perpage,
            blogId: this.props.postList.blogId,
        }));
    }

    getPostItems () {
        var self = this;
        if (
            ! self.props.postList.posts || 
            ! self.props.postList.posts.length
        ) {
            return null;
        }

        let chunkedItems = chunk(this.props.postList.posts, 3);
        let posts = map(chunkedItems, posts => {
            let partition = map(posts, post => {
                return <div className="col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a href = {"/post/" + self.props.postList.blog.id + "/" + post.id}>
                                    {post.title}
                                </a>
                            </h4>
                        </div>
                        <div className="panel-body">
                            {post.description} 
                        </div>
                        <div className="panel-footer">
                            <p>
                                <span className="glyphicon glyphicon-user"></span>&nbsp;
                                {post.userName}
                            </p>
                            <p>
                                <span className="glyphicon glyphicon-time"></span>&nbsp;
                                {post.date}
                            </p>
                        </div>
                    </div>
                </div>
            });
            return <div className="row">{partition}</div>
        });
        return posts;
    }

    render () {
        let alertOpts = null,
            posts = null;

        if (this.props.postList.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.postList.error
            }
        } else if (this.props.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }
        
       let pagerParam = {
            start: this.props.postList.start,
            perpage: this.props.postList.perpage,
            count: this.props.postList.count,
            items: this.getPostItems(),
            changePage: ::this.changePage,
        };
        
        return <div>
                <AlertMessage opts={alertOpts} />
                <ol className="breadcrumb">
                    <li><a href="/blogs">Blogs</a></li>
                    <li className="active">{this.props.postList.blog ? this.props.postList.blog.title : null}</li>
                </ol>
                <BlogComp blog={this.props.postList.blog} />
                <PaginatorLayout param={pagerParam} />
            </div>
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
ListComp = connect(mapStateToProps)(ListComp)

export default ListComp
