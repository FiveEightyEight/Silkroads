import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';
import { Avatar, Grid, Paper, Typography, Divider } from '@material-ui/core';


const styles = theme => ({
    avatar: {
        margin: 10,
    },
    profile: {
        width: '200px',
        padding: '5px',
        margin: '5px',
    },
});


export default withStyles(styles)(props => {

    const { classes } = props;

    const userProfile = (user) => {
        console.log(user)
        return (
            <>
                <Grid className={classes.profile}
                      container
                >
                    <Paper>
                        <Grid item xs={12}>
                            <Grid container>
                                <Avatar src="https://images.unsplash.com/photo-1534838525444-a4d09c0be267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80 1350w" 
                                alt="Remy Sharp" className={classes.avatar} />
                                <Typography variant='h5'>
                                    User Name
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body1'>
                                Profile Description
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit aspernatur ex officiis unde saepe explicabo omnis, accusamus delectus architecto quis iusto at fuga a minus aliquam in. Saepe, dolorum minus?
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>

            </>
        )
    }

    return (
        <Consumer>
            {
                (user) => {
                    if (!user) return <Redirect to='/' />
                    else return userProfile(user)
                }
            }
        </Consumer>
    )
})