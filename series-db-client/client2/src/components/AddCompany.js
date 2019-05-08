import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
import socketIOClient from 'socket.io-client';
const endpoint = "http://localhost:8081";
class AddCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
            Name:"",
            created: false,
         }
         
         this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.socket = socketIOClient(endpoint); 
    }
        
    AuthHelper = new AuthHelper();

    componentDidMount(){
        console.log("entry");
        
          if (this.AuthHelper.loggedIn()) {
            const confirm = this.AuthHelper.getConfirm();
            if (confirm) {
                this.setState({
                    confirmed: true
                })
            }
        }
      }         

      onChangeCompanyName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            name: this.state.Name,
        };

        this.socket.emit('add Company',obj);
        this.setState({created : true,});
    }

               
    render() {
        console.log("render");
        if (this.state.created) {
            return (<Redirect from='/add' to='/' />)}
        return(
            <div>
            <nav class="navbar navbar-light bg-light">
                <a class="float-right" href="/add" title="add">Add {this.state.title}</a>
            </nav>

    <div class="container">
            <p class="text-center text-danger">{this.state.message}</p>
        <form class="add-game-form" action="" onSubmit={this.onSubmit} enctype="multipart/form-data">
            <div class="form-row">                       
                    <div class="form-group col-md-4">
                        <input type="text" class="form-control" name="name" id="name" placeholder="name" onChange={this.onChangeCompanyName} required></input>
                    </div>

            </div>
            <button type="submit" class="btn btn-primary float-right">Add</button>
            
        </form>
    </div>
        </div>
        )
    }
}
 
export default AddCompany;