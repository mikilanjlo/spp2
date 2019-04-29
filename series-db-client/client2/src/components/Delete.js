import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Delete extends Component {
    constructor(props){
        super(props);
       
        
    }
    
         

    

               
    render() {
        let id = this.props.match.params.id;
        let name = this.props.match.params.name;
        axios.get('http://192.168.99.100:3000/'+name+'/delete/'+id)
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
            return (<Redirect from={name+'/delete/'+id} to={'/' +name} />)
    }
}
 
export default Delete;