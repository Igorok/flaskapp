import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {forEach, chunk, map} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';

class BlogListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.myBlogList.start,
            blogs: this.props.myBlogList.blogs,
        }
    }

    componentWillMount () {
        this.props.dispatch(graphql({
            type: 'BLOG_LIST',
            start: this.props.myBlogList.start, 
            perpage: this.props.myBlogList.perpage, 
        }));
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'BLOG_LIST',
            start: start, 
            perpage: this.props.myBlogList.perpage, 
        }));
    }

    getBlogItems () {
        let chunkedItems = chunk(this.props.myBlogList.blogs, 3);
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
                            <div dangerouslySetInnerHTML={{__html: blog.text}} />
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
    
        if (this.props.myBlogList.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.myBlogList.error
            }
        } else if (this.props.myBlogList.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }

        let pagerParam = {
            start: this.props.myBlogList.start,
            perpage: this.props.myBlogList.perpage,
            count: this.props.myBlogList.count,
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