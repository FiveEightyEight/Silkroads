import React, { Component } from 'react';
import Login from './Login'
import BottomNav from '../components/BottomNav';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// Contexts
import { Consumer } from '../contexts/Auth';
const styles = theme => ({
    home: {
        height: '100%',
    },
});

export default withStyles(styles)(class Home extends Component {
    state = {
        page: 'recents',
    }

    handleChange = (event, page) => {
        this.setState({ page });
    };
    render() {
        const { classes } = this.props;
        return (
            <Consumer>
                {
                    (user) => {
                        if (user) {
                            return (

                                <Grid container
                                    className={classes.home}
                                >
                                    <h2>Welcome back, {user.email}</h2>
                                    <h4>Your ID is: {user.uid}</h4>
                                    <div style={{ height: '1000px' }}>

                                    </div>
                                    <BottomNav value={this.state.page} handleChange={this.handleChange} />
                                </Grid>

                            )
                        } else {
                            return <Login />
                        }
                    }
                }
            </Consumer>
        )
    }
})