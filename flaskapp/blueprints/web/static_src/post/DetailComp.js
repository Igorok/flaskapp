import React from 'react'
import { connect } from 'react-redux'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'

import highlightjs from 'highlightjs';
import 'highlightjs/styles/vs2015.css'
import 'jquery'
import { Link } from 'react-router-dom';

class PostDetailComp extends React.Component {

    componentWillMount () {
        this.props.dispatch(graphql({
            type: 'POST_GET',
            id: this.props.postId,
            blogId: this.props.blogId
        }));
    }

    render () {
        let alertOpts = null;

        if (this.props.postDetail.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.postDetail.error || 'Error, wrong post data'
            }
        } else if (this.props.postDetail.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }

        // try to highlight
        let text = '';
        if (this.props.postDetail.text && this.props.postDetail.text.length) {
            text = $('<div></div>').html(this.props.postDetail.text);
            text.find('code')
                .each(function () {
                    $(this).addClass('hljs python')
                    highlightjs.highlightBlock($(this)[0])
                });
            text = text.html();
        }

        return <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
                    <li className="breadcrumb-item"><Link to={"/blog/" + this.props.postDetail.blogId}>Blog</Link></li>
                    <li className="breadcrumb-item active">{this.props.postDetail.title || 'Post detail'}</li>
                </ol>
            </nav>

            <AlertMessage opts={alertOpts} />
            <div className="card">
                <div className="card-header">
                    <h5>{this.props.postDetail.title}</h5>
                </div>
                <div className="card-body">
                    <p>
                        <i class="fa fa-user"></i>&nbsp;
                        {this.props.postDetail.userName}
                        &nbsp;|&nbsp;
                        <i class="fa fa-clock-o"></i>&nbsp;
                        {this.props.postDetail.date}
                    </p>
                    <p>
                        <em>
                            {this.props.postDetail.description}
                        </em>
                    </p>
                    <br />
                    <div dangerouslySetInnerHTML={{__html: text}} />
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return Object.assign({
        auth: state.auth,
        router: state.router,
        postDetail: state.postDetail,
    });
}
PostDetailComp = connect(mapStateToProps)(PostDetailComp)
export default PostDetailComp
