import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
//import socketIOClient from 'socket.io-client';
//const endpoint = "http://localhost:8081";
class Game extends Component {
    constructor(props){
        super(props);
        this.state = { values: [],
            title: "",
            titleadd: "",
            countValues: 2,
            valuesNames: ["id","name","Company","price $"],
            isEdit:false};
                           

            //this.socket = socketIOClient(endpoint); 
    }
        
    AuthHelper = new AuthHelper();

    componentDidMount(){
        console.log("entry");
        this.GetGames();
          if (this.AuthHelper.loggedIn()) {
            const confirm = this.AuthHelper.getConfirm();
            if (confirm) {
                this.setState({
                    confirmed: true
                })
            }
        }
      }         
    async  GetGames(){
        let result = await axios({
            url: 'http://localhost:8080/graphql',
            method: 'post',
            data: { query:`
                        {
                            games {
                                id
                                name
                                price
                                CompanyName
                            }
                        }
                        `}
        },
    );
    const result2 = result.data.data.games;
    console.log('getgames');
    console.log(result2);
    var array = [];
    //for(var i = 0; i < result2.length; i++)
    var i =0;
    result2.map((myvalue)=>
    {
        array[i] = [];
                        array[i][0] = myvalue.id;
                        array[i][1] =myvalue.name;
                        array[i][2] =myvalue.CompanyName//companyName; //GetCompany(result[i].id);
                        array[i][3] =myvalue.price;
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
                <Link to="/Games/add" class="float-right"   title="add">Add {this.state.title}</Link>
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
                                 <Link to={"/Games/edit/" + value[0]}  class="btn btn-sm btn-success">Edit</Link>

                                <Link to={"delete/Games/" + value[0]} class="btn btn-sm btn-danger">Delete</Link>
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
 
export default Game;