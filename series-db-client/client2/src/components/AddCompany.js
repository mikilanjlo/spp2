import React, { Component } from 'react';
import axios from 'axios';
 
class AddCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
            Name:"",
         }
         this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        console.log("entry");
        axios.get('http://192.168.99.100:3000/add')
          .then(response => {
            console.log("good");
            this.setState({ message: response.data.message ,
                });
            
          })
          .catch(function (error) {
            console.log(error);
          })
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

        axios.post('http://192.168.99.100:3000/add', obj)
            .then((response) => {
                console.log(response.data)
                this.statusCode = response.status
            })
            .then(response => {
                console.log("good");
                this.setState({ message: response.data.message ,
                    });
                
              })
              .catch(function (error) {
                console.log(error);
              })
    }

               
    render() {
        console.log("render");
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