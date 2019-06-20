import React from 'react'
import { connect } from 'react-redux'
import { graphql } from '../helpers/action'
import { AlertMessage } from '../helpers/component'
import { Link } from 'react-router-dom';


class BlogEditComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.blogEdit};
        this.state.id = this.props.blogId;
    }

    componentWillMount () {
        if (parseInt(this.state.id) === -1) {
            return this.setState({
                title: null,
                text: null,
                public: null,
                date: null
            });
        }

        this.props.dispatch(graphql({
            type: 'BLOG_GET',
            id: this.state.id,
        }));

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.blogEdit.status == 'success_get') {
            this.setState({
                title: nextProps.blogEdit.title,
                text: nextProps.blogEdit.text,
                public: nextProps.blogEdit.public,
                date: nextProps.blogEdit.date,
            });
        }

    }

    fieldChange (e) {
        let stateObj = {};
        let val = (e.target.id == 'public') ? e.target.checked : e.target.value;
        stateObj[e.target.id] = val;
        this.setState(stateObj);
    }

    formSubmit (e) {
        e.preventDefault();

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
            text: this.state.text,
            public: !! this.state.public,
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
        }

        return <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/profile">Profile</Link></li>
                    <li className="breadcrumb-item"><Link to="/my-blogs">My blogs</Link></li>
                    <li className="breadcrumb-item active">{this.state.title ? this.state.title : 'Edit blog'}</li>
                </ol>
            </nav>

            <div className="card">
                <div className="card-header">
                    {this.state.title ? this.state.title : 'Edit blog'}
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
                            <label htmlFor="text">Text</label>
                            <textarea
                                required
                                className="form-control"
                                id='text'
                                placeholder='Text'
                                onChange={::this.fieldChange}
                                value={this.state.text}
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
    return Object.assign({
        auth: state.auth,
        blogEdit: state.blogEdit,
    });
}
BlogEditComp = connect(mapStateToProps)(BlogEditComp)
export default BlogEditComp
