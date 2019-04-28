import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class Header extends Component {
    constructor(props){
        super(props);
        this.state = { items: []};
                           

    }
       

               
    render() {
        return(
            <div class="page-wrapper">
                <nav class="navbar navbar-light bg-light">
                    <span class="navbar-brand mb-0 h1"><Link to="/">Company</Link></span>
                    <span class="navbar-brand mb-0 h1"><Link to="/Games">Games</Link></span>
                    <span class="navbar-brand mb-0 h1"><Link to="/Comments">Comments</Link></span>
                </nav>
            </div>
        )
    }
}
export default Header;