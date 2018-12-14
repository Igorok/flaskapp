import React from 'react'
import { connect } from 'react-redux'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'


import io from 'socket.io-client'


class PrivateComp extends React.Component {
    constructor(props) {
        super(props);
        this.props = this.props || {};
        this.props.socket = io.connect('http://' + document.domain + ':' + location.port);

        this.state = {
            userId: this.props.chatPrivate.userId
        };


        this.props.socket.on('connect', () => {
            this.props.socket.emit('json', {data: 'I\'m connected!'});
        });
        this.props.socket.on('json', (r) => {
            console.log('receive json', r);
        });

        /*

        this.io = client(window.location.host);

        this.io.on('joinPers', (r) => {
            this.props.dispatch(joinPers(r));
        });

        this.io.on('message', (r) => {
            this.props.dispatch(message(r));
        });

        this.io.on('err', (e) => {
            if (e && e.toString() === '403') {
                localStorage.removeItem('user');
                return window.location = '/login'
            }
            this.props.dispatch(err({
                error: e,
            }));
        });

        */
    }


    /*
    
    emitMessage (msg) {
        let p = {
            token: this.props.auth.token,
            uId: this.props.chatPersonal.userId,
            rId: this.props.chatPersonal.roomId,
            msg: msg,
        }
        this.io.emit('message', p);
    }

    componentWillMount () {
        let p = {
            token: this.props.auth.token,
            userId: this.props.chatPersonal.userId,
        }
        this.io.emit('joinPers', p);
    }

    */


    render () {

        /*

        var socket = io.connect('http://' + document.domain + ':' + location.port);
        socket.on('connect', function() {
            socket.emit('json', {data: 'I\'m connected!'});
        });
        socket.on('json', function(r) {
            console.log('receive json', r);
        });

        */




        let alertOpts = null;

        console.log('this.props', this.props);

        if (this.props.chatPrivate.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.chatPrivate.error || 'Error, wrong post data'
            }
        } else if (this.props.chatPrivate.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        } else if (this.props.chatPrivate.status === 'success_edit') {
            alertOpts = {
                className: 'success',
                text: 'Post saved successfully',
            }
        }

        return <div>
            <ol className="breadcrumb">
                <li><a href="/users">Users</a></li>
                <li className="active">Chat</li>
            </ol>

            Hello userId - {this.state.userId}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
PrivateComp = connect(mapStateToProps)(PrivateComp)

export default PrivateComp


/*
class EditComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.postEdit};
        this.state.editorState = EditorState.createEmpty();
    }

    componentWillMount () {
        if (this.state.id === -1) {
            return;
        }

        this.props.dispatch(graphql({
            type: 'MY_POST_GET',
            id: this.state.id,
            blogId: this.state.blogId
        }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.postEdit.status == 'success_get') {
            const blocksFromHTML = htmlToDraft(nextProps.postEdit.text);
            const content = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );

            this.setState({
                userId: nextProps.postEdit.userId,
                userName: nextProps.postEdit.userName,
                userEmail: nextProps.postEdit.userEmail,
                title: nextProps.postEdit.title,
                description: nextProps.postEdit.description,
                text: nextProps.postEdit.text,
                date: nextProps.postEdit.date,
                public: nextProps.postEdit.public,
                editorState: EditorState.createWithContent(content),
            });
        }
    }

    fieldChange (e) {
        let stateObj = {};
        let val = (e.target.id == 'public') ? e.target.checked : e.target.value;
        stateObj[e.target.id] = val;
        this.setState(stateObj);
    }

    onEditorStateChange (editorState) {
        this.setState({
            editorState
        });
    }

    formSubmit (e) {
        e.preventDefault();
        let text = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

        this.props.dispatch(graphql({
            type: 'POST_EDIT',
            id: this.state.id,
            blogId: this.state.blogId,
            title: this.state.title,
            description: this.state.description,
            text: text,
            public: this.state.public,
        }));
    }

    render () {
        let alertOpts = null;

        if (this.props.postEdit.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.postEdit.error || 'Error, wrong post data'
            }
        } else if (this.props.postEdit.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        } else if (this.props.postEdit.status === 'success_edit') {
            alertOpts = {
                className: 'success',
                text: 'Post saved successfully',
            }
            setTimeout(() => {
                window.location = `/post-edit/${this.props.postEdit.blogId}/${this.props.postEdit.id}`;
            }, 1000)
        }

        return <div>
            <ol className="breadcrumb">
                <li><a href="/my-blogs">My blogs</a></li>
                <li><a href={"/my-blog-detail/" + this.props.postEdit.blogId}>Blog</a></li>
                <li className="active">{this.state.title || 'Edit post'}</li>
            </ol>

            <form onSubmit={::this.formSubmit} >
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        onChange={::this.fieldChange}
                        value={this.state.title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        onChange={::this.fieldChange}
                        value={this.state.description}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <Editor
                        editorState={this.state.editorState}
                        editorClassName="form-control"
                        onEditorStateChange={::this.onEditorStateChange}
                        toolbar={{
                            options: ['inline', 'list', 'fontSize', 'fontFamily', 'textAlign', 'link', 'history', 'colorPicker'],
                        }}
                    />

                </div>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            id='public'
                            onChange={::this.fieldChange}
                            checked = {!! this.state.public}
                        /> Public
                    </label>
                </div>

                <AlertMessage opts={alertOpts} />

                <hr />
                <div >
                    <button type="submit" className="btn btn-primary">
                        <span className='glyphicon glyphicon-floppy-disk'></span>&nbsp;
                        Save
                    </button>
                </div>
                <br />
            </form>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
EditComp = connect(mapStateToProps)(EditComp)
export default EditComp
*/
