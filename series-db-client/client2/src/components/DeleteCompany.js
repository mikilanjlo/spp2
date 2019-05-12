import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
const endpoint = "http://localhost:8081";
class DeleteCompany extends Component {
    constructor(props){
        super(props);
       
        //this.socket = socketIOClient(endpoint); 
    }
    
         

    

               
    render() {
        let id = this.props.match.params.id;
        
        this.socket.emit('delete Company',id);
        console.log("render games delete");
            return (<Redirect from={'/delete/'+id} to={'/' } />)
    }
}
 
export default DeleteCompany;