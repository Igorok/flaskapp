import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql} from '../helpers/action'
import { AlertMessage, MathCaptcha } from '../helpers/component'



class LoginComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            captcha: null,
        };
    }

    formSubmit (e) {
        e.preventDefault();

        if (! this.state.captcha) {
            return this.props.dispatch({
                type: 'AUTH_ERROR',
                error: 'Captcha is not valid!',
            });
        }

        this.props.dispatch(graphql({
            type: 'AUTH',
            login: e.target.elements.loginInput.value,
            password: e.target.elements.passwordInput.value,
        }));
    }

    checkCaptcha (v) {
        this.setState({
            captcha: v,
        })
    }

    render () {
        let disabled = null;
        let alertOpts = null;

        if (this.props.auth.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.auth.error || 'Error, wrong login or password'
            }
        } else if (this.props.auth.status === 'send') {
            disabled = 'disabled';
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        }

        return <div className="row justify-content-md-center">
            <div className="col-4">
                <div className="card">
                    <div className="card-header">
                        <h5>Authentication</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={::this.formSubmit}>
                            <div className="form-group">
                                <label htmlFor="loginInput">Login</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="loginInput"
                                    placeholder="Login"
                                    defaultValue={this.props.auth.login}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordInput">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Password"
                                    defaultValue={this.props.auth.password}
                                    disabled={disabled}
                                />
                            </div>
                            <MathCaptcha cb={::this.checkCaptcha} />
                            <AlertMessage opts={alertOpts} />
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={disabled}
                            >Login</button>
                        </form>
                        <br />
                        <p className='text-center'>
                            <Link to='/registration'>Registration</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps = (state) => {
    return Object.assign({
        auth: state.auth
    })
}
LoginComp = connect(mapStateToProps)(LoginComp)

export default LoginComp
