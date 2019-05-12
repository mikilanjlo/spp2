import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
import socketIOClient from 'socket.io-client';
class AddGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
            Name:"",
            Price: 0,
            Company: 0,
            created:false,
         }
         this.onChangeGameName = this.onChangeGameName.bind(this);
         this.onChangeGamePrice = this.onChangeGamePrice.bind(this);
         this.onChangeGameCompany= this.onChangeGameCompany.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         //this.socket = socketIOClient(endpoint); 
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

      onChangeGameName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    onChangeGameCompany(e) {
        this.setState({
            Company: e.target.value
        });
    }

    onChangeGamePrice(e) {
        this.setState({
            Price: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios({
            url: 'http://localhost:8080/graphql',
            method: 'post',
            data: {
                query: `
      mutation createGame($name: String, $price: String, $CompanyName: String){
  createGame(name: $name, price: $price, CompanyName: $CompanyName ){
    id
                                name
                                price
                                CompanyName
  }
}
      `,variables:{name: this.state.Name, price: this.state.Price, CompanyName: this.state.Company},}

        });
        this.setState({created : true,});
    }

               
    render() {
        console.log("render games add");
        if (this.state.created) {
            return (<Redirect from='Games/add' to='/Games' />)}
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
                        <input type="text" class="form-control" name="name" id="name" placeholder="name" onChange={this.onChangeGameName} required></input>
                    </div>
                    <div class="form-group col-md-4">
                        <input type="text" class="form-control" name="price" id="price" placeholder="price" onChange={this.onChangeGamePrice} required></input>
                    </div>
                    <div class="form-group col-md-4">
                        <input type="text" class="form-control" name="company_id" id="company_id" placeholder="company_id" onChange={this.onChangeGameCompany} required></input>
                    </div>

            </div>
            <button type="submit" class="btn btn-primary float-right">Add</button>
            
        </form>
    </div>
        </div>
        )
    }
}
 
export default AddGame;