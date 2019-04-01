import React, { Component } from 'react';
import Login from './containers/Login';
import { HashRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path='/' component={Login} />
        </HashRouter>
      </>
    );
  }
}

export default App;
