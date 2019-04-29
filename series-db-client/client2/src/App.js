import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from './components/Header';
import Company from './components/Company';
import AddCompany from './components/AddCompany';
import Game from './components/Game';
import AddGame from './components/AddGame';
import Comments from './components/Comments';
import AddComments from './components/AddComments';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Header />
          <Switch>
              <Route exact path='/' component={ Company }/>
              <Route path='/add' component={ AddCompany }/>
              <Route  path='/Games' component={ Game }/>
              <Route  path='/Games/add' component={ AddGame }/>
              <Route  path='/Comments' component={ Comments }/>
              <Route  path='/Comments/add' component={ AddComments }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
