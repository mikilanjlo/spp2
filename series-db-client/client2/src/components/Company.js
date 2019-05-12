import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
//import socketIOClient from 'socket.io-client';
import { Redirect } from 'react-router-dom';
//const endpoint = "http://localhost:8081";
class Company extends Component {
    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.state = { values: [],
            title: "",
            titleadd: "",
            countValues: 2,
            valuesNames: ["id","name"],
            isEdit:false};
            //this.socket = socketIOClient(endpoint);                

    }
        
    AuthHelper = new AuthHelper();

    componentDidMount(){
        this.GetCompany();
        
          if (this.AuthHelper.loggedIn()) {
            const confirm = this.AuthHelper.getConfirm();
            if (confirm) {
                this.setState({
                    confirmed: true
                })
            }
        }
      }         

      delete(id){axios.post('http://localhost:8080/delete/'+id)
      .then(console.log('Deleted'))
      .catch(err => console.log(err))
    }

async GetCompany(){
    let result = await axios({
        url: 'http://localhost:8080/graphql',
        method: 'post',
        data: { query:`
                    {
                        company {
                            id
                            name
                        }
                    }
                    `}
    },
);
const result2 = result.data.data.company;
console.log('company ',result2)
var array = [];
//for(var i = 0; i < result2.length; i++)
var i =0;
result2.map((myvalue)=>
{
    array[i] = [];
                    array[i][0] = myvalue.id;
                    array[i][1] =myvalue.name;
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
                < Link to="/add"class="float-right"  title="add">Add {this.state.title}</Link>
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
                            <Link to={"delete/" + value[0]} class="btn btn-sm btn-danger">Delete</Link>

                                 
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
 
export default Company;