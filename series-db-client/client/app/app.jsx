var ReactDOM = require('react-dom');
var React = require('react');
var { BrowserRouter , Switch, Route }  = require('react-router-dom');

var Header = require('./components/Header.jsx');
var Company = require('./components/Company.jsx');
var Game = require('./components/Game.jsx');

ReactDOM.render(
    <Header/>,
    document.getElementById("header")
)
ReactDOM.render(
    <Company/>,
    
    document.getElementById("app")
)




                           
