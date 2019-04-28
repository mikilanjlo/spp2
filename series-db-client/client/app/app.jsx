var ReactDOM = require('react-dom');
var React = require('react');
var  BrowserRouter , {Switch, Route }  = require('react-router-dom');
var Provider = require('react-redux');
var store = require('./store/index');

var Header = require('./components/Header.jsx');
var Company = require('./components/Company.jsx');
var Game = require('./components/Game.jsx');

class App extends React.Component {
    render(){
        return(<BrowserRouter>
        <div>
            <Header/>
            <Company/>
            </div>
        </BrowserRouter>)
    }
}


ReactDOM.render(
<Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter></Provider>
,
    
    
    document.getElementById("app")
)




                           
