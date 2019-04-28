var React = require('react');
 
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = { items: []};
                           

    }
       

               
    render() {
        return(
            <div class="page-wrapper">
                <nav class="navbar navbar-light bg-light">
                    <span class="navbar-brand mb-0 h1"><a href="/">Company</a></span>
                    <span class="navbar-brand mb-0 h1"><a href="/Games">Games</a></span>
                    <span class="navbar-brand mb-0 h1"><a href="/Comments">Comments</a></span>
                </nav>
            </div>
        )
    }
}
module.exports = Header;