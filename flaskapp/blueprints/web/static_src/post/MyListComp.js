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
                hideBtn = <btn className="btn btn-primary" onClick={pubBlog} data-id={this.props.blog.id}>
                    <i class="fa fa-eye-slash"></i>&nbsp;
                    Hide
                </btn>
            } else {
                hideBtn = <btn className="btn btn-primary" onClick={pubBlog} data-id={this.props.blog.id}>
                    <i class="fa fa-eye"></i>&nbsp;
                    Show
                </btn>
            }

            tpl = <div>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">
                            {this.props.blog.title}
                        </h4>
                    </div>
                    <div className="card-body">
                        <div dangerouslySetInnerHTML={{__html: this.props.blog.text}} />
                    </div>
                    <div className="card-footer">
                        <p>
                            <i class="fa fa-user"></i>&nbsp;
                            {this.props.blog.userName}
                            &nbsp;|&nbsp;
                            <i class="fa fa-clock-o"></i>&nbsp;
                            {this.props.blog.date}
                        </p>
                        <p>
                            <a href={"/blog-edit/" + this.props.blog.id} className="btn btn-primary">
                                <i class="fa fa-pencil"></i>&nbsp;
                                Edit
                            </a>
                            &nbsp;
                            {hideBtn}
                            &nbsp;
                            <a href={"/post-edit/" + this.props.blog.id + "/-1"} className="btn btn-primary">
                                <i class="fa fa-plus"></i>&nbsp;
                                Add post
                            </a>
                        </p>
                    </div>
                </div>
                <br />
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
                return <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                <a href = {"/post-edit/" + self.props.myPostList.blog.id + "/" + post.id}>
                                    {post.title}
                                </a>
                            </h4>
                        </div>
                        <div className="card-body">
                            {post.description}
                        </div>
                        <div className="card-footer">
                            <p>
                                <i class="fa fa-user"></i>&nbsp;
                                {post.userName}
                            </p>
                            <p>
                                <i class="fa fa-clock-o"></i>&nbsp;
                                {post.date}
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
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><a href="/profile">Profile</a></li>
                    <li className="breadcrumb-item"><a href="/my-blogs">My blogs</a></li>
                    <li className="breadcrumb-item active">{this.props.myPostList.blog ? this.props.myPostList.blog.title : null}</li>
                </ol>
            </nav>
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
