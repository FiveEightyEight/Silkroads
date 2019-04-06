import React, { Component } from 'react';
import Login  from './containers/Login'
import SignUp  from './containers/SignUp';
import Home from './containers/Home';
import NavBar from './components/NavBar';
import { HashRouter, Route } from 'react-router-dom';
import firebase from './firebase';

// Context
import AuthContext from './contexts/Auth';

class App extends Component {

  state = {
    user: null
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
        <AuthContext.Provider value={this.state.user}>
          <HashRouter>
            <Route path='/' component={NavBar}/>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={SignUp} />
          </HashRouter>
        </AuthContext.Provider>
      </>
    );
  }
}

export default App;
