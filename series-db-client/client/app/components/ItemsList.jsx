var React = require('react');
var axios = require('axios');
 
class ItemsList extends React.Component {
    constructor(props){
        super(props);
        this.state = { items: []};
                           

    }
    componentDidMount(){
        console.log("entry");
        axios.get('http://192.168.99.100:3000/')
          .then(response => {
            console.log("good");
            this.setState({ items: response.data.values });
            
          })
          .catch(function (error) {
            console.log(error);
          })
      }         

               
    render() {
        console.log("render");
        return(
            <div>         
                
                
                
                    
                        
                <ul>
                    {
                        this.state.items.map(function(item){
                            return <td>{item[0]}</td>
                        })
                    }
                </ul>
                    
                
            </div>);
    }
}
 
module.exports = ItemsList;