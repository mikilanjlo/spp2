import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import {rerenderHeader} from "../../actions/index";
import "./Auth.css";

import AuthHelper from './AuthHelper';

function mapDispatchToProps(dispatch) {
    return {
        rerenderHeader: flag => dispatch(rerenderHeader(flag))
    }
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            isLogged: false,
            error: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    AuthHelper = new AuthHelper();

    componentWillMount() {
        if (this.AuthHelper.loggedIn()){
            this.setState({
                isLogged: true
            });
            this.props.rerenderHeader(true);
        } else {
            this.setState({
                isLogged: false
            });
        }         
    }

    onSubmit(e) {
        e.preventDefault();

        localStorage.removeItem("id_token");
        
        this.AuthHelper.login(this.state.login, this.state.password)
            .then(res => {
                if (res === false) {
                    return alert("Sorry those credentials don't exist!");
                }

                this.setState({
                    isLogged: true
                })
                this.props.rerenderHeader(true);
            })
            .catch(err => {
                alert(err);
            })
    }

    onLoginChange(e) {
        this.setState({
            login: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {        
        let errorBlock = <p></p>
        if (this.state.error != "") {
            errorBlock = <div class="alert alert-danger" role="alert">{this.state.error}</div>
        }

        if (this.state.isLogged) {
            console.log("logged succesfully!");
            return <Redirect from='/login' to='/'/>
        }

        return(
            <div className="container">
                {errorBlock}
                <h3 className="text">Login</h3>
                <form id="login_form" onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <div className="col-sm-5">
                            <label htmlFor="login" className="col-sm-2 text edit-label">Login</label>
                            <input type="text" className="form-control" name="login" id="login"
                             value={this.state.login} onChange={this.onLoginChange} required />
                        </div>                    
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-5">
                            <label htmlFor="password" className="col-sm-2 text edit-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password"
                             value={this.state.password} onChange={this.onPasswordChange} required />
                        </div>
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group col-sm-5">
                        <button type="submit" className="btn btn-success float-center" id="submit-player-button">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Login);