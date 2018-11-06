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
            let hideBtn = null;
            function pubBlog (e) {
                e.preventDefault();
                return self.props.publicBlog({
                    id: self.props.blog.id,
                    public: ! self.props.blog.public
                });
            }
            if (this.props.blog.public) {
                hideBtn = <btn className="btn btn-default" onClick={pubBlog} data-id={this.props.blog.id}>
                    <span className="glyphicon glyphicon-remove"></span>&nbsp;
                    hide
                </btn>
            } else {
                hideBtn = <btn className="btn btn-default" onClick={pubBlog} data-id={this.props.blog.id}>
                    <span className="glyphicon glyphicon-ok"></span>&nbsp;
                    show
                </btn>
            }

            tpl = <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            {this.props.blog.title}
                        </h4>
                    </div>
                    <div className="panel-body">
                        <div dangerouslySetInnerHTML={{__html: this.props.blog.text}} />
                    </div>
                    <div className="panel-footer">
                        <p>
                            <span className="glyphicon glyphicon-user"></span>&nbsp;
                            {this.props.blog.userName}
                            &nbsp;|&nbsp;
                            <span className="glyphicon glyphicon-calendar"></span>&nbsp;
                            {this.props.blog.date}
                        </p>
                        <p>
                            <a href={"/blog-edit/" + this.props.blog.id} className="btn btn-default">
                                <span className="glyphicon glyphicon-pencil"></span>&nbsp;
                                edit
                            </a>
                            &nbsp;
                            {hideBtn}
                            &nbsp;
                            <a href={"/post-edit/" + this.props.blog.id + "/-1"} className="btn btn-default">
                                <span className="glyphicon glyphicon-plus"></span>&nbsp;
                                Add post
                            </a>
                        </p>
                    </div>
                </div>
        }
        return tpl;
    }
}





class MyListComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.myPostList.start,
            blog: this.props.myPostList.blog,
            posts: this.props.myPostList.posts,
        }
    }

    componentWillMount () {
        this.changePage();
    }

    changePage (start = 0) {
        this.props.dispatch(graphql({
            type: 'MY_BLOG_DETAIL',
            start: start,
            perpage: this.props.myPostList.perpage,
            blogId: this.props.myPostList.blogId,
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

    getPostItems () {
        var self = this;
        if (
            ! self.props.myPostList.posts || 
            ! self.props.myPostList.posts.length
        ) {
            return null;
        }

        let chunkedItems = chunk(this.props.myPostList.posts, 3);
        let posts = map(chunkedItems, posts => {
            let partition = map(posts, post => {
                return <div className="col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a href = {"/post-edit/" + self.props.myPostList.blog.id + "/" + post.id}>
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
                                <span className="glyphicon glyphicon-calendar"></span>&nbsp;
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

        if (this.props.myPostList.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.myPostList.error
            }
        } else if (this.props.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }
        
       let pagerParam = {
            start: this.props.myPostList.start,
            perpage: this.props.myPostList.perpage,
            count: this.props.myPostList.count,
            items: this.getPostItems(),
            changePage: ::this.changePage,
        };
        
        return <div>
                <AlertMessage opts={alertOpts} />
                <ol className="breadcrumb">
                    <li><a href="/my-blog-list">My blogs</a></li>
                    <li className="active">{this.props.myPostList.blog ? this.props.myPostList.blog.title : null}</li>
                </ol>
                <BlogComp blog={this.props.myPostList.blog} publicBlog={::this.publicBlog}/>
                <PaginatorLayout param={pagerParam} />
            </div>
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
MyListComp = connect(mapStateToProps)(MyListComp)

export default MyListComp

/*
class PostListComp extends React.Component {
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
PostListComp = connect(mapStateToProps)(PostListComp)

export default PostListComp
*/