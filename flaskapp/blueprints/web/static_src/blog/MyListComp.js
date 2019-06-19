import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {chunk, map} from 'lodash';
import { AlertMessage, PaginatorLayout } from '../helpers/component';
import {Link} from 'react-router-dom'
import queryString from 'query-string';

class MyBlogListComp extends React.Component {
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
            type: 'MY_BLOG_LIST',
            start: start,
            perpage: this.state.perpage,
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
                                <Link to = {"/my-blog-detail/" + blog.id}>
                                    {blog.title}
                                </Link>
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
                                <Link to={"/blog-edit/" + blog.id} className="btn btn-primary">
                                    <i class="fa fa-pencil"></i>&nbsp;
                                    Edit
                                </Link>
                                &nbsp;
                                {hideBtn}
                                &nbsp;
                                <Link to={"/post-edit/" + blog.id + "/-1"} className="btn btn-primary">
                                    <i class="fa fa-plus"></i>&nbsp;
                                    Add post
                                </Link>
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
            start: this.state.start,
            perpage: this.state.perpage,
            count: this.props.myBlogList.count,
            items: this.getBlogItems(),
            changePage: ::this.changePage,
        };


        return <div>
            <AlertMessage opts={alertOpts} />
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/profile">Profile</Link></li>
                    <li className="breadcrumb-item active">My blogs</li>
                </ol>
            </nav>
            <PaginatorLayout param={pagerParam} />
        </div>

    }
}
const mapStateToProps = (state) => {
    return Object.assign({
        router: state.router,
        auth: state.auth,
        myBlogList: state.myBlogList,
    });
}
MyBlogListComp = connect(mapStateToProps)(MyBlogListComp)

export default MyBlogListComp
