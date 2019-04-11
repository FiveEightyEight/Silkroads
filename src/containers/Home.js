import React, { Component } from 'react';
import Login from './Login'
import BottomNav from '../components/BottomNav';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import Feed from '../components/Feed';
// Contexts
import { Consumer } from '../contexts/Auth';
const styles = theme => ({
    home: {
        height: '100%',
    },
    paper: {
        height:'250px',
        // height: 'calc(100% - 250px)',
        overflowY: 'auto',
    //     [theme.breakpoints.up('sm')]: {
    //         marginTop: 5,
    //         height: 'calc(100% - 10px)'
    //     },
    //     [theme.breakpoints.down('xs')]: {
    //         height: '100%'
    //     },
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

                                    <Paper className={classes.paper}>
                                        {
                                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((e, i) => {
                                                return <Feed key={i} />
                                            })
                                        }
                                    </Paper>
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