import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
import socketIOClient from 'socket.io-client';
const endpoint = "http://localhost:8081";
class Comments extends Component {
    constructor(props){
        super(props);
        this.state = { values: [],
            title: "",
            titleadd: "",
            countValues: 2,
            valuesNames: [],
            isEdit:false};
                           
            this.socket = socketIOClient(endpoint); 
    }
        
    AuthHelper = new AuthHelper();

    componentDidMount(){
        console.log("entry");
        this.GetComments();
          if (this.AuthHelper.loggedIn()) {
            const confirm = this.AuthHelper.getConfirm();
            if (confirm) {
                this.setState({
                    confirmed: true
                })
            }
        }
      }    
      
      GetComments(){
        this.socket.on('Comments', (comments) => {
            console.log('good');
            console.log(comments);
            if(comments !== null)
            this.setState({ values: comments.values ,
                title: comments.title,
                //titleadd: response.data.titleadd,
                countValues: comments.countValues,
                valuesNames: comments.valuesNames,
                isEdit:comments.isEdit,});
            
          
        });
    }

               
    render() {
        console.log("render");
        return(
            <div>
            <nav class="navbar navbar-light bg-light">
                <Link class="float-right"  to="/Comments/add" title="add">Add {this.state.title}</Link>
            </nav>
            <table class="table table-hovered">
            <thead class="thead-dark">
                <tr>
                    {
                    this.state.valuesNames.map(function(name){
                       return  (<th scope="col">{name}</th>)
                        })
                    }
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>{
            this.state.values.map(function(value){
                return(
                    <tr>
                        {
                        value.map(function(value2){
                            return (<td>{value2}</td>)
                        })
                    }

                            <td>
                                 <Link to={"/Comments/edit/" + value[0]}  class="btn btn-sm btn-success">Edit</Link>

                                 <Link to={"delete/Comments/" + value[0]} class="btn btn-sm btn-danger">Delete</Link>
                            </td>
                        
                    </tr>)
                }
                )
            }
                
            </tbody>
        </table>
        </div>
        )
    }
}
 
export default Comments;