import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
 
class Company extends Component {
    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.state = { values: [],
            title: "",
            titleadd: "",
            countValues: 2,
            valuesNames: [],
            isEdit:false};
                           

    }
    componentDidMount(){
        console.log("entry");
        axios.get('http://192.168.99.100:3000/')
          .then(response => {
            console.log("good");
            this.setState({ values: response.data.values ,
                title: response.data.title,
                //titleadd: response.data.titleadd,
                countValues: response.data.countValues,
                valuesNames: response.data.valuesNames,
                isEdit:response.data.isEdit,});
            
          })
          .catch(function (error) {
            console.log(error);
          })
      }         

      delete(id){axios.post('http://192.168.99.100:3000/delete/'+id)
      .then(console.log('Deleted'))
      .catch(err => console.log(err))
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