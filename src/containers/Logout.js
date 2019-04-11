import React from 'react';
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';


import { Consumer } from '../contexts/Auth';
export default class Logout extends React.Component {

    componentDidMount() {
        firebase.auth().signOut()
    }

    render() {
        return (
            <Consumer>
                {
                    (user) => {
                        if (user) {
                            return <h1>Logging out...</h1>;
                        } else {
                            return <Redirect to='/' />;
                        }
                    }
                }
            </Consumer>
        )
    }
}