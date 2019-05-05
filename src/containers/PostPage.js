import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { getUserProfile } from '../services/members';

const styles = theme => ({ 

});

export default withStyles(styles)(class PostPage extends Component {
    state = {

    };

    componentDidMount() {
        console.log(this.props.location)
    };

    render() {
        return(
            <h1>Post Page</h1>
        );
    };
});