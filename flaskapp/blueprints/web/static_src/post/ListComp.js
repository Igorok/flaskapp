import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {forEach, chunk, map} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';
import queryString from 'query-string';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class BlogComp extends React.Component {
    render () {
        var self = this;
        var tpl = null;
        if (this.props.blog) {
            tpl = <div className="card">
                <div className="card-header">
                    <h5>{this.props.blog.title}</h5>
                </div>
                <div className="card-body">
                    {this.props.blog.text}
                </div>
                <div className="card-footer">
                    <p>
                        <i class="fa fa-user"></i>&nbsp;
                        {this.props.blog.userName}
                        &nbsp;|&nbsp;
                        <i class="fa fa-clock-o"></i>&nbsp;
                        {this.props.blog.date}
                    </p>
                </div>
            </div>
        }
        return tpl;
    }
}

class PostListComp extends React.Component {
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

    changePage () {
        this.props.dispatch(graphql({
            type: 'BLOG_DETAIL',
            start: this.state.start,
            perpage: this.state.perpage,
            blogId: this.props.blogId,
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
                return <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>
                                <Link to={"/post/" + self.props.postList.blog.id + "/" + post.id}>
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
            start: this.state.start,
            perpage: this.state.perpage,
            count: this.props.postList.count,
            items: this.getPostItems(),
            changePage: ::this.changePage,
        };

        return <div>
                <AlertMessage opts={alertOpts} />
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">{this.props.postList.blog ? this.props.postList.blog.title : null}</li>
                    </ol>
                </nav>
                <BlogComp blog={this.props.postList.blog} />
                <br />
                <PaginatorLayout param={pagerParam} />
            </div>
    }
}

const mapStateToProps = (state) => {
    return Object.assign({
        auth: state.auth,
        postList: state.postList,
        router: state.router
    });
}
PostListComp = connect(mapStateToProps)(PostListComp)

export default PostListComp
