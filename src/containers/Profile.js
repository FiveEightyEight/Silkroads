import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { getUserProfile } from '../services/members';


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


export default withStyles(styles)(class Profile extends Component {
    state = {
        username: null,
        posts: null,
    }


    userProfile = (classes, user) => {
        const { username } = this.state;
        if (username) {
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
                                    {/* {
                                        (bio) ? bio : "Profile Description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit aspernatur ex officiis unde saepe explicabo omnis, accusamus delectus architecto quis iusto at fuga a minus aliquam in. Saepe, dolorum minus?"
                                    } */}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>

                </>
            )
        } else {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h5'
                        align='center'
                        >
                            Loading...
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
    };

    componentDidMount() {
        const { id } = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
        if (!id) return <Redirect to='/' />;
        getUserProfile(id)
            .then(({ data }) => {
                const { username } = data[0]
                this.setState({
                    username: username,
                    posts: data,
                })
            })
            .catch(err => {
                console.log('error: ', err)
            })
    };
    componentDidUpdate() {
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        return (
            <Consumer>
                {
                    (user) => {
                        if (!user) return <Redirect to='/' />
                        else return this.userProfile(classes, user)
                    }
                }
            </Consumer>
        )
    }
});