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
            type: 'MY_BLOG_LIST',
            start: this.props.myBlogList.start,
            perpage: this.props.myBlogList.perpage,
        }));
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'MY_BLOG_LIST',
            start: start,
            perpage: this.props.myBlogList.perpage,
        }));
    }
    /**
     * make the blog public or hidden
     * @param  {Number} p.id id of blog
     * @param  {Boolean} p.public true - show blog, false - hide blog
     */
    publicBlog (p) {
        this.props.dispatch(graphql({
            type: 'MY_BLOG_PUBLIC',
            id: p.id,
            public: p.public
        }));
    }

    getBlogItems () {
        var self = this;
        let chunkedItems = chunk(this.props.myBlogList.blogs, 3);
        let blogs = map(chunkedItems, blogs => {
            let partition = map(blogs, blog => {
                let hideBtn = null;
                function pubBlog (e) {
                    e.preventDefault();
                    return self.publicBlog({
                        id: blog.id,
                        public: ! blog.public
                    });
                }
                if (blog.public) {
                    hideBtn = <btn className="btn btn-default" onClick={pubBlog} data-id={blog.id}>
                        <span className="glyphicon glyphicon-remove"></span>&nbsp;
                        hide
                    </btn>
                } else {
                    hideBtn = <btn className="btn btn-default" onClick={pubBlog} data-id={blog.id}>
                        <span className="glyphicon glyphicon-ok"></span>&nbsp;
                        show
                    </btn>
                }


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
                        </div>
                        <div className="panel-footer">
                            <p>
                                <span className="glyphicon glyphicon-user"></span>&nbsp;
                                {blog.userName}
                            </p>
                            <p>
                                <span className="glyphicon glyphicon-calendar"></span>&nbsp;
                                {blog.date}
                            </p>
                            <p>
                                <a href={"/blog-edit/" + blog.id} className="btn btn-default">
                                    <span className="glyphicon glyphicon-pencil"></span>&nbsp;
                                    edit
                                </a>
                                &nbsp;
                                {hideBtn}
                                &nbsp;
                                <a href={"/post-edit/" + blog.id + "/-1"} className="btn btn-default">
                                    <span className="glyphicon glyphicon-plus"></span>&nbsp;
                                    Add post
                                </a>
                                
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
        } else if (this.props.status === 'send') {
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
