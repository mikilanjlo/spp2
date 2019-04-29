import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class DeleteCompany extends Component {
    constructor(props){
        super(props);
       
        
    }
    
         

    

               
    render() {
        let id = this.props.match.params.id;
        
        axios.get('http://192.168.99.100:3000/delete/'+id)
            .then((response) => {
                console.log(response.data)
                this.statusCode = response.status

            })
            .then(response => {
                console.log("good");

              })
              .catch(function (error) {
                console.log(error);
              })
        console.log("render games add");
            return (<Redirect from={'/delete/'+id} to={'/' } />)
    }
}
 
export default DeleteCompany;