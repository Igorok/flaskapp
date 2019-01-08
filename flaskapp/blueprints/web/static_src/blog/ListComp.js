import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {forEach, chunk, map} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';

class BlogListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.blogList.start,
            blogs: this.props.blogList.blogs,
        }
    }

    componentWillMount () {
        this.props.dispatch(graphql({
            type: 'BLOG_LIST',
            start: this.props.blogList.start,
            perpage: this.props.blogList.perpage,
        }));
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'BLOG_LIST',
            start: start,
            perpage: this.props.blogList.perpage,
        }));
    }

    getBlogItems () {
        let chunkedItems = chunk(this.props.blogList.blogs, 3);
        let blogs = map(chunkedItems, blogs => {
            let partition = map(blogs, blog => {
                return <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                <a href = {"/blog/" + blog.id}>{blog.title}</a>
                            </h4>
                        </div>
                        <div className="card-body">
                            {blog.text}
                        </div>
                        <div className="card-footer">
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

            return <div>
                <div className="row">{partition}</div>
                <br />
            </div>
        });

        return blogs;
    }



    render () {
        let alertOpts = null,
            blogs = null;

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

        return <div>
            <AlertMessage opts={alertOpts} />
            <PaginatorLayout param={pagerParam} />
        </div>

    }
}
const mapStateToProps = (state) => {
    return {...state}
}
BlogListComp = connect(mapStateToProps)(BlogListComp)

export default BlogListComp
