import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
const endpoint = "http://localhost:8081";
class Delete extends Component {
    constructor(props){
        super(props);
       
        this.socket = socketIOClient(endpoint); 
    }
    
         

    

               
    render() {
        let id = this.props.match.params.id;
        let name = this.props.match.params.name;
        this.socket.emit('delete '+name,id);

        console.log("delete"+name,id);
            return (<Redirect from={name+'/delete/'+id} to={'/' +name} />)
    }
}
 
export default Delete;