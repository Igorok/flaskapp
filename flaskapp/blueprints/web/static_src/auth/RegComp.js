import React from 'react'
import { connect } from 'react-redux'
import {graphql} from '../helpers/action'
import {AlertMessage} from '../helpers/component'
import { Link } from 'react-router-dom';


class RegistrationComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            confirmPassword: null,
        };
    }

    formSubmit (e) {
        e.preventDefault();
        if (
            ! this.state.email || this.state.email.length < 1 ||
            ! this.state.password || this.state.password.length < 1
        ) {
            this.props.dispatch({
                type: 'REG_ERROR',
                error: 'Email and password are required!'
            });
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.props.dispatch({
                type: 'REG_ERROR',
                error: 'Please confirm password!'
            });
            return;
        }

        this.props.dispatch(graphql({
            type: 'REG',
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }));
    }

    fieldChange (e) {
        e.preventDefault();
        let update = {};
        update[e.target.id] = e.target.value ? e.target.value.toString().trim() : null;
        this.setState(update);
    }

    render () {
        let disabled = null,
            alertOpts = null;

        if (this.props.registration.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.registration.error || 'Error, wrong email or password'
            }
        } else if (this.props.registration.status === 'send') {
            disabled = 'disabled';
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        } else if (this.props.registration.status === 'success') {
            alertOpts = {
                className: 'success',
                text: 'Registration is successfully, please login.',
            }
        }

        return <div className="row justify-content-md-center">
            <div className="col-4">
                <div className="card">
                    <div className="card-header">
                        <h5>Registration</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={::this.formSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    defaultValue={this.props.registration.email}
                                    onChange={::this.fieldChange}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    defaultValue={this.props.registration.password}
                                    onChange={::this.fieldChange}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <input
                                    type="password"
                                    required
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    defaultValue={this.props.registration.confirmPassword}
                                    onChange={::this.fieldChange}
                                    disabled={disabled}
                                />
                            </div>
                            <AlertMessage opts={alertOpts} />
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={disabled}
                            >Registration</button>
                        </form>
                        <br />
                        <p className='text-center'>
                            <Link to='/login'>Login</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps = (state) => {
    return Object.assign({
        auth: state.auth,
        registration: state.registration
    });
}
RegistrationComp = connect(mapStateToProps)(RegistrationComp)

export default RegistrationComp
