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
            <ol className="breadcrumb">
                <li><a href="/blogs">My blogs</a></li>
                <li><a href={"/blog/" + this.props.postDetail.blogId}>Blog</a></li>
                <li className="active">{this.state.title || 'Post detail'}</li>
            </ol>
            <AlertMessage opts={alertOpts} />
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        {this.props.postDetail.title}
                    </h4>
                </div>
                <div className="panel-body">
                    <p>
                        <span className="glyphicon glyphicon-user"></span>&nbsp;
                        {this.props.postDetail.userName}
                        &nbsp;|&nbsp;
                        <span className="glyphicon glyphicon-time"></span>&nbsp;
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

