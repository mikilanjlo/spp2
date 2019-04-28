import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from './components/Header';
import Company from './components/Company';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Header />
          <Switch>
              <Route exact path='/' component={ Company }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
