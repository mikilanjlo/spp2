var React = require('react');
var axios = require('axios');
 
class Company extends React.Component {
    constructor(props){
        super(props);
        this.state = { values: [],
            title: "",
            titleadd: "",
            countValues: 2,
            valuesNames: [],
            isEdit:false};
                           

    }
    componentDidMount(){
        console.log("entry");
        axios.get('http://192.168.99.100:3000/')
          .then(response => {
            console.log("good");
            this.setState({ values: response.data.values ,
                title: response.data.title,
                //titleadd: response.data.titleadd,
                countValues: response.data.countValues,
                valuesNames: response.data.valuesNames,
                isEdit:response.data.isEdit,});
            
          })
          .catch(function (error) {
            console.log(error);
          })
      }         

               
    render() {
        console.log("render");
        return(
            <div>
            <nav class="navbar navbar-light bg-light">
                <a class="float-right" href="/add" title="add">Add</a>
            </nav>
            <table class="table table-hovered">
            <thead class="thead-dark">
                <tr>
                    {
                    this.state.valuesNames.map(function(name){
                       return  (<th scope="col">{name}</th>)
                        })
                    }
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>{
            this.state.values.map(function(value){
                return(
                    <tr>
                        {
                        value.map(function(value2){
                            return (<td>{value2}</td>)
                        })
                    }

                            <td>
                                 <a href={"edit/" + value[0]} target="_blank" rel="noopener" class="btn btn-sm btn-success">Edit</a>

                                <a href={"delete/" + value[0]} class="btn btn-sm btn-danger">Delete</a>
                            </td>
                        
                    </tr>)
                }
                )
            }
                
            </tbody>
        </table>
        </div>
        )
    }
}
 
module.exports = Company;