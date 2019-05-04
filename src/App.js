import React, { Component } from 'react';
import { Home, Login, Logout, Post, Profile, SignUp } from './containers/';
import NavBar from './components/NavBar';

import Splash from './components/Splash';
import { Grid } from '@material-ui/core';
import { HashRouter, Route } from 'react-router-dom';
import firebase from './firebase';

// Context
import { Provider } from './contexts/Auth';


class App extends Component {

  state = {
    user: null,
    loadBuffer: true,
  };

  updateUser = (user) => {

  };
  manageUser = (firebaseUser) => {
    this.setState({ user: firebaseUser });

  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.manageUser(user)
      }
      else {
        this.setState({ user: null })
      }
    })
    // using a loadbuff for splash
    setTimeout(() => {
      this.setState({
        loadBuffer: false,
      })
    }, 1500);
  }


  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { loadBuffer } = this.state;
    return (
      <>
        {
          (loadBuffer) ? <Splash />
            :
            <HashRouter>
              <Provider value={this.state.user}>
                <Route path='/' component={NavBar} />
                <Grid container style={{ marginTop: '65px' }}>
                  <Route path='/' exact component={Home} />
                  <Route path='/profile' exact component={Profile} />
                  <Route path='/post' exact component={Post} />
                  <Route path='/login' exact component={Login} />
                  <Route path='/signup' exact component={SignUp} />
                  <Route path='/logout' exact component={Logout} />
                </Grid>
              </Provider>
            </HashRouter>
        }
      </>
    );
  }
}

export default App;
