import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import LoginRegForm from "../components/LoginRegForm"
import CrudPage from "./CrudPage"
import "bootstrap/dist/css/bootstrap.min.css"
import logo from '../logo.svg'
import { connect } from "react-redux";
import { login, checkToken, logout, signup } from "../actions/userActions"

class App extends Component {
    componentDidMount() {
        this.props.checkTokenAction();
    }

    render() {
        const isLogged = this.props.isLogged;
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <img src={logo} width="30" height="30" alt='хуета' />
                        <Link to="/" className="navbar-brand">CRUD app</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                {isLogged ?
                                    <li>
                                        <Link to="/" className="nav-link" onClick={() => { this.props.logoutAction() }}>Logout</Link>
                                    </li>
                                    :
                                    <>
                                        <li>
                                            <Link to="/" className="nav-link">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/signup" className="nav-link">Sing up</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </nav>
                    <br />
                    {isLogged ?
                        <>
                            <Route exact path="/" render={(props) => <CrudPage {...props} />} />
                            <Route exact path="/signup" render={(props) => <CrudPage {...props} />} />
                        </>
                        :
                        < >
                            <Route exact path="/" render={(props) => <LoginRegForm action={this.props.loginAction} isLogin={true} {...props} />} />
                            <Route exact path="/signup" render={(props) => <LoginRegForm action={this.props.signUpAction} isLogin={false} {...props} />} /></>}
                    <Redirect to="/" />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = store => {
    return {
        isLogged: store.user.isLogged
    }
}

const mapDispatchToProps = dispatch => ({
    loginAction: (email, password) => dispatch(login(email, password)),
    logoutAction: () => dispatch(logout()),
    signUpAction: (email, password) => dispatch(signup(email, password)),
    checkTokenAction: () => dispatch(checkToken())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)