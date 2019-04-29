import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./Auth.css";
import axios from 'axios';
import {connect} from "react-redux";
import {rerenderHeader} from "../../actions/index";
import AuthHelper from './AuthHelper';

function mapDispatchToProps(dispatch) {
    return {
        rerenderHeader: flag => dispatch(rerenderHeader(flag))
    }
}

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            repeatPassword: "",
            isRegistered: false,
            error: ""
        }
        this.statusCode = "";

        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
    }

    AuthHelper = new AuthHelper();
    
    onSubmit(e) {
        e.preventDefault();

        if (this.state.password != this.state.repeatPassword) {
            this.setState({
                error: "Please, repeat your password!"
            });
        } else {
            const obj = {
                login: this.state.login,
                password: this.state.password
            }


            axios.post('http://192.168.99.100:3000/register', obj)
                .then((response) => {
                    console.log(response.data)
                    this.statusCode = response.status
                })
                .catch(err => {
                    console.log(err);
                    this.statusCode = 500;
                })
            
            if (this.statusCode != 500) {
                this.setState({
                    isRegistered: true
                })
            }
    
            alert("You have been succesfully registered!");
        }        
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

    onRepeatPasswordChange(e) {
        this.setState({
            repeatPassword: e.target.value
        });
    }

    render() {
        let errorBlock = <p></p>
        if (this.state.error != "") {
            errorBlock = <div class="alert alert-danger" role="alert">{this.state.error}</div>
        }

        if (this.state.isRegistered) {
            console.log("Registered succesfully!");
            return <Redirect from='/register' to='/' />
        }

        return(
            <div className="container">
                {errorBlock}
                <h3 className="text">Register</h3>
                <p></p>
                <form id="login_form" onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <div className="col-sm-5">
                            <label htmlFor="login" className="text edit-label">Login</label>
                            <input type="text" className="form-control" name="login" id="login"
                             value={this.state.login} onChange={this.onLoginChange} required />
                        </div>                    
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-5">
                            <label htmlFor="password" className="text edit-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password"
                             value={this.state.password} onChange={this.onPasswordChange} required />
                        </div>
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-5">
                            <label htmlFor="repeatPassword" className=" text edit-label">Repeat password</label>
                            <input type="password" className="form-control" name="repeatPassword" id="repeatPassword"
                             value={this.state.repeatPassword} onChange={this.onRepeatPasswordChange} required />
                        </div>
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group col-sm-5">
                        <button type="submit" className="btn btn-success float-center" id="submit-player-button">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Register);