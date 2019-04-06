import React, { Component } from 'react';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import { HashRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path='/' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
        </HashRouter>
      </>
    );
  }
}

export default App;
