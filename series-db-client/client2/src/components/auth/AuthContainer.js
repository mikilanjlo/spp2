import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <span>                
              <Link to={'/login'} >Login</Link>
              <Link to={'/register'}>Register</Link>
            </span>
        )
    }
}

export default AuthContainer;