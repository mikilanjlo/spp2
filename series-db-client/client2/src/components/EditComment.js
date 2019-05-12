import React, { Component } from 'react';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
import { Redirect } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
const endpoint = "http://localhost:8081";
class EditComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
            Name:"",
            Game: 0,
            edited:false,
         }
         this.onChangeCommentName = this.onChangeCommentName.bind(this);
         this.onChangeCommentGame= this.onChangeCommentGame.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         //this.socket = socketIOClient(endpoint); 
    }
        
    AuthHelper = new AuthHelper();

    componentDidMount(){
        console.log("entry");
        let id = this.props.match.params.id;
        
          if (this.AuthHelper.loggedIn()) {
            const confirm = this.AuthHelper.getConfirm();
            if (confirm) {
                this.setState({
                    confirmed: true
                })
            }
        }
      }         

      onChangeCommentName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    onChangeCommentGame(e) {
        this.setState({
            Game: e.target.value
        });
    }



    onSubmit(e) {
        e.preventDefault();

        
        
        axios({
            url: 'http://localhost:8080/graphql',
            method: 'post',
            data: {
                query: `
      mutation editComment($id : String,$name: String){
  editComment(id:$id, name: $name){
    id
                                name
                                gamename
  }
}
      `,variables:{name: this.state.Name, id: this.props.match.params.id},}

        });
        this.setState({edited : true,});
    }

               
    render() {
        console.log("render");
        if (this.state.edited) {
            return (<Redirect from='Comments/edit' to='/Comments' />)}
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
                        <input type="text" class="form-control" name="name" id="name" placeholder="name" onChange={this.onChangeCommentName} required></input>
                    </div>

            </div>
            <button type="submit" class="btn btn-primary float-right">Add</button>
            
        </form>
    </div>
        </div>
        )
    }
}
 
export default EditComment;