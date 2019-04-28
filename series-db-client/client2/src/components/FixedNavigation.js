import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthContainer from './auth/AuthContainer';
import UserInfo from './auth/UserInfo';
import AuthHelper from './auth/AuthHelper';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        shouldRerenderHeader: state.shouldRerenderHeader
    }
}

class FixedNavigation extends Component {
    constructor(params) {
        super(params);

        this.state = {
            currentUser: {},
            confirmed: false,
            logged: false
        }
    }

    AuthHelper = new AuthHelper();

    componentDidMount() {
        if (this.AuthHelper.loggedIn()) {
            var confirm = this.AuthHelper.getConfirm();

            if (confirm) {
                this.setState({
                    currentUser: confirm,
                    confirmed: true
                })
            }
        }

        console.log(this.state.confirmed)
    }

    handleUserInfoChanges = (flag) => {
        if (this.AuthHelper.loggedIn()) {
            var confirm = this.AuthHelper.getConfirm();

            if (confirm) {
                this.setState({
                    currentUser: confirm,
                    confirmed: true
                })
            }
        }

        this.setState({
            confirmed: flag
        });
    }

    handleAuthContainerChanges = (flag) => {
        this.setState({
            confirmed: flag
        });
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to={'/'} className="navbar-brand">Transfer Market</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {this.props.shouldRerenderHeader
                        ? <div>


                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/ranobes'} className="nav-link">Ranobes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/authors'} className="nav-link">Authors</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/animes'} className="nav-link">Animes</Link>
                                </li>
                            </ul>
                            <UserInfo login = {this.state.currentUser.login} handleUserInfoChanges = {this.handleUserInfoChanges}/>
                        </div>
                        : <AuthContainer handleAuthContainerChanges = {this.handleAuthContainerChanges}/>}
                </div>
            </nav>
        );
    }
}

export default connect(mapStateToProps)(FixedNavigation);
