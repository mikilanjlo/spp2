import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <span>                
              <Link to={'/login'} className="btn btn-outline-info my-2 my-sm-0">Login</Link>
              <Link to={'/register'} className="btn btn-outline-info my-2 my-sm-0">Register</Link>
            </span>
        )
    }
}

export default AuthContainer;