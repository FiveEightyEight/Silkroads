import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';

const styles = {

};

export default withStyles(styles)(class Posts extends Component {

    state = {
        user: null,
    };

    userProfile = (user) => {
        console.log(user)
    }

    render() {
        return (
            <>
                <Consumer>
                    {
                        (user) => {
                            if (!user) return <Redirect to='/' />
                            else this.userProfile(user)
                        }
                    }
                    
                </Consumer>
            </>
        )
    }
});