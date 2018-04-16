import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {forEach, chunk, map} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';

class BlogListItem extends React.Component {
    render () {
        return <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        <a href = {"/blog-detail/" + this.props.item._id}>
                            {this.props.item.name}
                        </a>
                    </h4>
                </div>
                <div className="panel-body">
                    <p>
                        {this.props.item.description}
                    </p>
                </div>
            </div>
        </div>
    }
}

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
                return <div className="col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a href = {"/blog-detail/" + blog.id}>
                                    {blog.title}
                                </a>
                            </h4>
                        </div>
                        <div className="panel-body">
                            <p>
                                {blog.text}
                            </p>
                            <p>
                                {blog.userName}&nbsp;
                                {blog.date}
                            </p>
                        </div>
                    </div>
                </div> 
            });

            return <div className="row">{partition}</div>
        });

        return blogs;
    }

    

    render () {
        let alertOpts = null,
            blogs = null;
    
        if (this.props.blogList.status === 'error') {
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