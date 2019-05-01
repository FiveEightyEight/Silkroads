import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';


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
        const { id } = JSON.parse(localStorage.getItem('user')) || null;
        if (!id) return <Redirect to='/' />;
            return axios({
            method: 'get',
            url: `http://localhost:5000/members/${id}`,
        })
            .then(data => {
                console.log(data)
                const { username, bio } = data.data
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
                                            {username}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='body1'>
                                        {
                                            (bio) ? bio : "Profile Description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit aspernatur ex officiis unde saepe explicabo omnis, accusamus delectus architecto quis iusto at fuga a minus aliquam in. Saepe, dolorum minus?"
                                        }
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>

                    </>
                )
            })
            .catch(err => {
                console.log('error: ', err)
            })

    }

    return (
        <Consumer>
            {
                (user) => {
                    if (!user) return <Redirect to='/' />
                    else  userProfile(user) 
                }
            }
        </Consumer>
    )
})