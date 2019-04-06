import React, { Component } from 'react';
import Login  from './Login'
import { withStyles } from '@material-ui/core/styles';

// Contexts
import AuthContext from '../contexts/Auth';

const styles = theme => ({

});

export default withStyles(styles)(class Home extends Component {
    render() {
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <h2>Welcome back, {user.email}</h2>
                                    <h4>Your ID is: {user.uid}</h4>
                                </>
                            )
                        } else {
                            return <Login />
                        }
                    }
                }
            </AuthContext.Consumer>
        )
    }
})