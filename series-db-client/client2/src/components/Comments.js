import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
import socketIOClient from 'socket.io-client';
class Comments extends Component {
    constructor(props){
        super(props);
        this.state = { values: [],
            title: "",
            titleadd: "",
            countValues: 2,
            valuesNames: ["id","game id","content"],
            isEdit:false};
                           
            //this.socket = socketIOClient(endpoint); 
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
      
     async GetComments(){
        let result = await axios({
            url: 'http://localhost:8080/graphql',
            method: 'post',
            data: { query:`
                        {
                            comments {
                                id
                                name
                                gamename
                            }
                        }
                        `}
        },
    );
    const result2 = result.data.data.comments;
    console.log('getcomments');
    console.log(result2);
    var array = [];
    //for(var i = 0; i < result2.length; i++)
    var i =0;
    result2.map((myvalue)=>
    {
        array[i] = [];
                        array[i][0] = myvalue.id;
                        array[i][2] =myvalue.name;
                        array[i][1] =myvalue.gamename
        i++;
    });
            this.setState({ values: array
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