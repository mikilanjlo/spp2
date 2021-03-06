import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
 
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
    }
    
    componentDidMount(){
        console.log("entry");
        axios.get('http://192.168.99.100:3000/Games/add')
          .then(response => {
            console.log("good");
            this.setState({ message: response.data.message ,
                });
            
          })
          .catch(function (error) {
            console.log(error);
          })
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

        const obj = {
            name: this.state.Name,
            price: this.state.Price,
            company_id: this.state.Company,
        };
        console.log(obj);
        axios.post('http://192.168.99.100:3000/Games/add', obj)
            .then((response) => {
                console.log(response.data)
                this.statusCode = response.status
                this.setState({ created:true ,
                });
            })
            .then(response => {
                console.log("good");
                this.setState({ message: response.data.message ,created:false,
                    });
                
              })
              .catch(function (error) {
                console.log(error);
              })
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