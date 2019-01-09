import React from 'react'
import { connect } from 'react-redux'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'


class DetailComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.postDetail};
    }

    componentWillMount () {
        if (this.state.id === -1) {
            return;
        }

        this.props.dispatch(graphql({
            type: 'POST_GET',
            id: this.state.id,
            blogId: this.state.blogId
        }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.postDetail.status == 'success_get') {
            this.setState({
                userId: nextProps.postDetail.userId,
                userName: nextProps.postDetail.userName,
                userEmail: nextProps.postDetail.userEmail,
                title: nextProps.postDetail.title,
                description: nextProps.postDetail.description,
                text: nextProps.postDetail.text,
                date: nextProps.postDetail.date,
                public: nextProps.postDetail.public,
            });
        }
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

        return <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><a href="/blogs">Blogs</a></li>
                    <li className="breadcrumb-item"><a href={"/blog/" + this.props.postDetail.blogId}>Blog</a></li>
                    <li className="breadcrumb-item active">{this.state.title || 'Post detail'}</li>
                </ol>
            </nav>
            
            <AlertMessage opts={alertOpts} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">
                        {this.props.postDetail.title}
                    </h4>
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
                    <div dangerouslySetInnerHTML={{__html: this.props.postDetail.text}} />
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
DetailComp = connect(mapStateToProps)(DetailComp)
export default DetailComp
