import React from 'react'
import { connect } from 'react-redux'
import { graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class PostEditComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.postEdit};
        this.state.blogId = this.props.blogId;
        this.state.id = this.props.postId;

        this.state.editorState = EditorState.createEmpty();
    }

    componentWillMount () {
        if (this.state.id == -1) {
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
        } else if (nextProps.postEdit.status == 'success_edit') {
            this.setState({
                id: nextProps.postEdit.id
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
        }

        return <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/profile">Profile</Link></li>
                    <li className="breadcrumb-item"><Link to="/my-blogs">My blogs</Link></li>
                    <li className="breadcrumb-item"><Link to={"/my-blog-detail/" + this.state.blogId}>Blog</Link></li>
                    <li className="breadcrumb-item active">{this.state.title || 'Edit post'}</li>
                </ol>
            </nav>

            <div className="card">
                <div className="card-header">
                    {this.state.title ? this.state.title : 'Edit post'}
                </div>
                <div className="card-body">
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
                                <i class="fa fa-save"></i>&nbsp;
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        postEdit: state.postEdit,
        auth: state.auth,
        router: state.router
    }
}
PostEditComp = connect(mapStateToProps)(PostEditComp)
export default PostEditComp
