import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';


import Header from './components/Header';
import Company from './components/Company';
import AddCompany from './components/AddCompany';
import Game from './components/Game';
import AddGame from './components/AddGame';
import EditGame from './components/EditGame';
import Comments from './components/Comments';
import AddComments from './components/AddComment';
import EditComments from './components/EditComment';
import Delete from './components/Delete';
import DeleteCompany from './components/DeleteCompany';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <div >

          <Header />
          <Switch>
              <Route exact path='/' component={ Company }/>
              <Route path='/login' component={ Login } />

              <Route path='/register' component={ Register } />
              <Route path='/add' component={ AddCompany }/>
              <Route  path='/Games/edit/:id' component={ EditGame }/>
              <Route  path='/Games/add' component={ AddGame }/>
              <Route  path='/Games' component={ Game }/>
              
              <Route  path='/Comments/edit/:id' component={ EditComments }/>
              <Route  path='/Comments/add' component={ AddComments }/>
              <Route  path='/Comments' component={ Comments }/>
              <Route  path='/delete/:name/:id' component={ Delete }/>
              <Route  path='/delete/:id' component={ DeleteCompany }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
