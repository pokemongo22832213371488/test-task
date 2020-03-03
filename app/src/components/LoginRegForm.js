import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"


const FormErrors = ({ formErrors }) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>

export default class LoginRegForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({
            formValid: this.state.emailValid &&
                this.state.passwordValid
        });
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.props.action(this.state.email, this.state.password);
    }

    handleSignUpSubmit = (e) => {
        e.preventDefault();
        this.props.action(this.state.email, this.state.password);
    }

    render() {
        return (
            <form className="demoForm">
                <h2>{this.props.isLogin ? "Login" : "Sign up"}</h2>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" value={this.state.email} onChange={this.handleUserInput} className="form-control"
                        name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={this.state.password} onChange={this.handleUserInput} className="form-control"
                        name="password" />
                </div>
                <Button variant="primary" disabled={!this.state.formValid} type="submit" onClick={this.props.isLogin ? this.handleLoginSubmit : this.handleSignUpSubmit}>
                    {this.props.isLogin ? "Login" : "Sign up"}
                </Button>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
            </form>
        );
    }
}