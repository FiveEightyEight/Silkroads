import React from 'react';
import AuthContext from '../contexts/Auth';
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';

export default class Logout extends React.Component {

    componentDidMount() {
        firebase.auth().signOut()
    }

    render() {
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return <h1>Logging out...</h1>;
                        } else {
                            return <Redirect to='/' />;
                        }
                    }
                }
            </AuthContext.Consumer>
        )
    }
}