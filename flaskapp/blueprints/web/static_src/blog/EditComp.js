import React from 'react'
import { connect } from 'react-redux'
import {api, graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';



class EditComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.blogEdit};
        this.state.editorState = EditorState.createEmpty();
    }

    componentWillMount () {
        console.log('this.state.blog', this.state.blog);
        /*
        this.props.dispatch(api({
            type: 'BLOG_LIST',
            fetch: 'blog.getBlogList',
        }));
        */
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

        console.log(
            'this.state', this.state,
            draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        );

        // this.props.dispatch(api({
        //     type: 'POST_EDIT',
        //     fetch: 'blog.editMyPostDetail',
        //     _id: this.state._id,
        //     _bId: this.state._bId,
        //     status: this.state.status,
        //     name: this.state.name,
        //     description: this.state.description,
        // }));
    }


    render () {
        return <div>
            <form onSubmit={::this.formSubmit} >
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
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

                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                        <span className='glyphicon glyphicon-floppy-disk'></span>&nbsp;
                        Save
                    </button>
                </div>
            </form>
        </div>
        
    }
}

const mapStateToProps = (state) => {
    return {...state}
}
EditComp = connect(mapStateToProps)(EditComp)
export default EditComp
