import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
 
class EditGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
            Name:"",
            Price: 0,
            Company: 0,
            edited:false,
         }
         this.onChangeGameName = this.onChangeGameName.bind(this);
         this.onChangeGamePrice = this.onChangeGamePrice.bind(this);
         this.onChangeGameCompany= this.onChangeGameCompany.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }
        
    AuthHelper = new AuthHelper();

    componentDidMount(){
        console.log("entry");
        let id = this.props.match.params.id;
        axios.get('http://192.168.99.100:3000/Games/edit/' + id)
          .then(response => {
            console.log("good");
            this.setState({ message: response.data.message ,
                });
            
          })
          .catch(function (error) {
            console.log(error);
          })
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

        const obj = {
            price: this.state.Price,
        };
        let id = this.props.match.params.id;
        axios.post('http://192.168.99.100:3000/Games/edit/'+id, obj)
            .then((response) => {
                console.log(response.data)
                this.statusCode = response.status
                this.setState({ edited:true ,
                });
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
        if (this.state.edited) {
            return (<Redirect from='Games/edit' to='/Games' />)}
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
                        <input type="text" class="form-control" name="price" id="price" placeholder="price" onChange={this.onChangeGamePrice} required></input>
                    </div>


            </div>
            <button type="submit" class="btn btn-primary float-right">Add</button>
            
        </form>
    </div>
        </div>
        )
    }
}
 
export default EditGame;