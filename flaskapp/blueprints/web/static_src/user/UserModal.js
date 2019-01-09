import React from 'react';
import {Modal} from 'bootstrap';
import 'jquery';


export class UserRemoveModal extends React.Component {
    constructor (props) {
        super(props);
    }

    showRemove () {
        if (this.props.user) {
            $('.user-remove-modal').modal('show');
        } else {
            $('.user-remove-modal').modal('hide');
        }
    }

    cancelRemove () {
        if (! this.props.user) {
            return;
        }
        this.props.cancelRemove(this.props.user.id);
    }

    approveRemove () {
        if (! this.props.user) {
            return;
        }
        this.props.approveRemove(this.props.user.id);
    }

    componentDidMount () {
        this.showRemove();
    }

    componentDidUpdate(prevProps, prevState) {
        this.showRemove();
    }

    render () {
        let login = this.props.user ? this.props.user.login : null;

        return <div class="modal user-remove-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm of removing</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Would you like to remove {login} from the friends?</p>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={::this.cancelRemove}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={::this.approveRemove}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
};

export class UserApproveModal extends React.Component {
    constructor (props) {
        super(props);
    }

    showApprove () {
        if (this.props.user) {
            $('.user-approve-modal').modal('show');
        } else {
            $('.user-approve-modal').modal('hide');
        }
    }

    cancelAdd () {
        if (! this.props.user) {
            return;
        }
        this.props.cancelAdd(this.props.user.id);
    }

    approveAdd () {
        if (! this.props.user) {
            return;
        }
        this.props.approveAdd(this.props.user.id);
    }

    componentDidMount () {
        this.showApprove();
    }

    componentDidUpdate(prevProps, prevState) {
        this.showApprove();
    }

    render () {
        let login = this.props.user ? this.props.user.login : null;

        return <div class="modal user-approve-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm of friend</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Would you like to add {login} to the friends?</p>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={::this.cancelAdd}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={::this.approveAdd}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
}
