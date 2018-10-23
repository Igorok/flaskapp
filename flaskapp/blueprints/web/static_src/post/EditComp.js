import React from 'react'
import { connect } from 'react-redux'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

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




/*
import React from 'react'
import { connect } from 'react-redux'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';



class EditComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.blogEdit};
        this.state.editorState = EditorState.createEmpty();
    }

    componentWillMount () {
        if (this.state.id === -1) {
            return;
        }
        
        this.props.dispatch(graphql({
            type: 'BLOG_GET',
            id: this.state.id,
        }));

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.blogEdit.status == 'success_get') {
            const blocksFromHTML = htmlToDraft(nextProps.blogEdit.text);
            const content = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );

            this.setState({
                title: nextProps.blogEdit.title,
                text: nextProps.blogEdit.text,
                public: nextProps.blogEdit.public,
                date: nextProps.blogEdit.date,
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

        if (text && (text.length > 512)) {
            return this.props.dispatch({
                type: 'BLOG_EDIT_ERROR',
                error: 'Text is too long!',
            });
        }

        this.props.dispatch(graphql({
            type: 'BLOG_EDIT',
            id: this.state.id,
            title: this.state.title,
            text: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
            public: this.state.public,
        }));
    }

    render () {
        let alertOpts = null;
    
        if (this.props.blogEdit.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.blogEdit.error || 'Error, wrong blog data'
            }
        } else if (this.props.blogEdit.status === 'send') {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        } else if (this.props.blogEdit.status === 'success_edit') {
            alertOpts = {
                className: 'success',
                text: 'Blog saved successfully',
            }
            setTimeout(() => {
                window.location = '/blog-edit/' + this.props.blogEdit.id;
            }, 1000)
        }

        return <div>
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