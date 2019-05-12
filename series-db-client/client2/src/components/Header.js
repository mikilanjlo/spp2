import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthContainer from './auth/AuthContainer';
import UserInfo from './auth/UserInfo';
import AuthHelper from './auth/AuthHelper';
import { connect } from "react-redux";
import socketIOClient from 'socket.io-client';
const endpoint = "http://localhost:8081";
const mapStateToProps = state => {
    return {
        shouldRerenderHeader: state.shouldRerenderHeader
    }
}

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: {},
            confirmed: false,
            logged: false
        }
        //this.socket = socketIOClient(endpoint); 
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
            <div>
            <div class="page-wrapper">
                <nav class="navbar navbar-light bg-light">
                    <span class="navbar-brand mb-0 h1"><Link to="/">Company</Link></span>
                    <span class="navbar-brand mb-0 h1"><Link to="/Games">Games</Link></span>
                    <span class="navbar-brand mb-0 h1"><Link to="/Comments">Comments</Link></span>
                </nav>
            </div>
            <nav class="navbar navbar-light bg-light">
               {this.state.confirmed ? ( <UserInfo login = {this.state.currentUser.login} handleUserInfoChanges = {this.handleUserInfoChanges}/>):(
            
             <AuthContainer handleAuthContainerChanges = {this.handleAuthContainerChanges}/>)}
             </nav>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Header);