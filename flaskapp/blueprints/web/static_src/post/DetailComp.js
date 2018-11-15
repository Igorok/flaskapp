import React from 'react'
import { connect } from 'react-redux'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

class DetailComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.postDetail};
        this.state.editorState = EditorState.createEmpty();
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

            /*

            const blocksFromHTML = htmlToDraft(nextProps.postDetail.text);

            
            const content = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );

            */

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

    fieldChange (e) {
        let stateObj = {};
        let val = (e.target.id == 'public') ? e.target.checked : e.target.value;
        stateObj[e.target.id] = val;
        this.setState(stateObj);
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
        } else if (this.props.postDetail.status === 'success_edit') {
            alertOpts = {
                className: 'success',
                text: 'Post saved successfully',
            }
            setTimeout(() => {
                window.location = `/post-edit/${this.props.postDetail.blogId}/${this.props.postDetail.id}`;
            }, 1000)
        }

        return <div>
            <ol className="breadcrumb">
                <li><a href="/my-blog-list">My blogs</a></li>
                <li><a href={"/my-blog-detail/" + this.props.postDetail.blogId}>Blog</a></li>
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
DetailComp = connect(mapStateToProps)(DetailComp)
export default DetailComp

