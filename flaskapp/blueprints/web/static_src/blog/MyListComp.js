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
                    hideBtn = <btn className="btn btn-primary" onClick={pubBlog} data-id={blog.id}>
                        <i class="fa fa-eye-slash"></i>&nbsp;
                        Hide
                    </btn>
                } else {
                    hideBtn = <btn className="btn btn-primary" onClick={pubBlog} data-id={blog.id}>
                        <i class="fa fa-eye"></i>&nbsp;
                        Show
                    </btn>
                }

                return <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>
                                <a href = {"/my-blog-detail/" + blog.id}>
                                    {blog.title}
                                </a>
                            </h5>
                        </div>
                        <div className="card-body">
                            {blog.text}
                        </div>
                        <div className="card-footer">
                            <p>
                                <i class="fa fa-user"></i>&nbsp;
                                {blog.userName}
                            </p>
                            <p>
                                <i class="fa fa-clock-o"></i>&nbsp;
                                {blog.date}
                            </p>
                            <p>
                                <a href={"/blog-edit/" + blog.id} className="btn btn-primary">
                                    <i class="fa fa-pencil"></i>&nbsp;
                                    Edit
                                </a>
                                &nbsp;
                                {hideBtn}
                                &nbsp;
                                <a href={"/post-edit/" + blog.id + "/-1"} className="btn btn-primary">
                                    <i class="fa fa-plus"></i>&nbsp;
                                    Add post
                                </a>
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
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><a href="/profile">Profile</a></li>
                    <li className="breadcrumb-item active">My blogs</li>
                </ol>
            </nav>
            <PaginatorLayout param={pagerParam} />
        </div>

    }
}
const mapStateToProps = (state) => {
    return {...state}
}
BlogListComp = connect(mapStateToProps)(BlogListComp)

export default BlogListComp
