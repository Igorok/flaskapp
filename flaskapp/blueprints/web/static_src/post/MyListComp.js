import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import { chunk, map } from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class BlogComp extends React.Component {
    render () {
        var tpl = null;
        if (! this.props.blog) {
            return null;
        }

        let hideBtn = null;
        function pubBlog (e) {
            e.preventDefault();
            return this.props.publicBlog({
                id: this.props.blog.id,
                public: ! this.props.blog.public
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
                    <h5>{this.props.blog.title}</h5>
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
                        <Link to={"/blog-edit/" + this.props.blog.id} className="btn btn-primary">
                            <i class="fa fa-pencil"></i>&nbsp;
                            Edit
                        </Link>
                        &nbsp;
                        {hideBtn}
                        &nbsp;
                        <Link to={"/post-edit/" + this.props.blog.id + "/-1"} className="btn btn-primary">
                            <i class="fa fa-plus"></i>&nbsp;
                            Add post
                        </Link>
                    </p>
                </div>
            </div>
            <br />
        </div>

        return tpl;
    }
}





class MyPostListComp extends React.Component {
    constructor(props) {
        super(props);

        let search = queryString.parse(this.props.router.location.search);
        this.state = {
            start: search.start || 0,
            perpage: search.perpage || 9
        }
    }

    componentWillMount () {
        this.changePage();
    }

    changePage (start = this.state.start) {
        this.props.dispatch(graphql({
            type: 'MY_BLOG_DETAIL',
            start: start,
            perpage: this.state.perpage || 9,
            blogId: this.props.blogId,
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
        if (
            ! this.props.myPostList.posts ||
            ! this.props.myPostList.posts.length
        ) {
            return null;
        }

        let chunkedItems = chunk(this.props.myPostList.posts, 3);
        let posts = map(chunkedItems, posts => {
            let partition = map(posts, post => {
                return <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>
                                <Link to = {"/post-edit/" + this.props.myPostList.blog.id + "/" + post.id}>
                                    {post.title}
                                </Link>
                            </h5>
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
            start: this.state.start || 0,
            perpage: this.state.perpage || 9,
            count: this.props.myPostList.count,
            items: this.getPostItems(),
            changePage: ::this.changePage,
        };

        return <div>
            <AlertMessage opts={alertOpts} />
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/profile">Profile</Link></li>
                    <li className="breadcrumb-item"><Link to="/my-blogs">My blogs</Link></li>
                    <li className="breadcrumb-item active">{this.props.myPostList.blog ? this.props.myPostList.blog.title : null}</li>
                </ol>
            </nav>
            <BlogComp blog={this.props.myPostList.blog} publicBlog={::this.publicBlog}/>
            <PaginatorLayout param={pagerParam} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return Object.assign({
        router: state.router,
        auth: state.auth,
        myPostList: state.myPostList,
    });
}
MyPostListComp = connect(mapStateToProps)(MyPostListComp)

export default MyPostListComp
