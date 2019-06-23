import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '../helpers/action';
import {forEach, chunk, map} from 'lodash';
import {AlertMessage, PaginatorLayout} from '../helpers/component';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class BlogListComp extends React.Component {
    constructor(props) {
        super(props);

        let search = queryString.parse(this.props.router.location.search);
        this.state = {
            start: search.start || 0,
            perpage: search.perpage || 6
        }
    }

    componentWillMount () {
        this.changePage();
    }

    changePage (start = this.state.start) {
        this.props.dispatch(graphql({
            type: 'BLOG_LIST',
            start: start,
            perpage: this.state.perpage,
        }));
        this.setState({start: start});
    }

    getBlogItems () {
        let chunkedItems = chunk(this.props.blogList.blogs, 3);
        let blogs = map(chunkedItems, blogs => {
            let partition = map(blogs, blog => {
                return <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>
                                <Link to={"/blog/" + blog.id}>{blog.title}</Link>
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
            start: this.state.start,
            perpage: this.state.perpage,
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
    return Object.assign({
        auth: state.auth,
        router: state.router,
        blogList: state.blogList
    });
}
BlogListComp = connect(mapStateToProps)(BlogListComp)

export default BlogListComp
