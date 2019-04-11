import React, { Component } from 'react';
import Login from './containers/Login'
import SignUp from './containers/SignUp';
import Home from './containers/Home';
import NavBar from './components/NavBar';
import Logout from './containers/Logout';
import { Grid } from '@material-ui/core';
import { HashRouter, Route } from 'react-router-dom';
import firebase from './firebase';

// Context
import {Provider} from './contexts/Auth';


class App extends Component {

  state = {
    user: null,
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
      else {
        this.setState({ user: null })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <>
        <HashRouter>
          <Provider value={this.state.user}>
            <Route path='/' component={NavBar} />
            <Grid container style={{ marginTop: '65px' }}>
              <Route path='/' exact component={Home} />
              <Route path='/login' exact component={Login} />
              <Route path='/signup' exact component={SignUp} />
              <Route path='/logout' exact component={Logout} />
            </Grid>
          </Provider>
        </HashRouter>
      </>
    );
  }
}

export default App;
