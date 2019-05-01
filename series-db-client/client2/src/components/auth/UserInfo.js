import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Auth.css";
import {connect} from "react-redux";
import {rerenderHeader} from "../../actions/index";

import AuthHelper from './AuthHelper';

function mapDispatchToProps(dispatch) {
    return {
        rerenderHeader: flag => dispatch(rerenderHeader(flag))
    }
}

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            loggedOut: false
        }

        this.onLogOut = this.onLogOut.bind(this);
    }
    
    AuthHelper = new AuthHelper();

    onLogOut(){
        localStorage.removeItem("id_token");
        this.setState({
            loggedOut: true
        });
        this.props.handleUserInfoChanges(false);
        this.props.rerenderHeader(false);
    }

    componentDidMount() {
        this.setState({
            login:this.props.login
        })
    }

    render() {

        return(
            <span>
                <span className="navbar-text navbar-username">Logged in!</span>
                <Link to={'/teams'} onClick={this.onLogOut} >Log out</Link>
            </span>
        )
    }
}

export default connect(null, mapDispatchToProps)(UserInfo);