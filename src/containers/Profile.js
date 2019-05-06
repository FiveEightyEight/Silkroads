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
    profilePaper: {
        height: '200px',
    },
    post: {

        margin: '5px',
    },
    paper: {
        width: '100%',
        height: '100px',
        padding: '3px',
    },
});


export default withStyles(styles)(class Profile extends Component {
    state = {
        username: null,
        posts: null,
    }

    handlePostClick = post_id => e => {
        if (typeof post_id !== 'number') return;
        this.props.history.push(`/posts/view/${post_id}`)
    };


    userProfile = (classes, user) => {
        const { username, posts } = this.state;
        if (username) {
            return (
                <>
                    <Grid className={classes.profile}
                        container
                    >
                        <Paper
                            className={classes.profilePaper}
                        >
                            <Grid item xs={12}>
                                <Grid container>
                                    <Avatar src="https://images.unsplash.com/photo-1534838525444-a4d09c0be267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80 1350w"
                                        alt="Remy Sharp" className={classes.avatar} />
                                    <Typography variant='h4'>
                                        <strong>{username}</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container>
                        {(!posts) ? <></>
                            :
                            <>
                                {
                                    posts.map((e, i, arr) => {
                                        return (
                                            < Grid item xs={12}
                                                className={classes.post}
                                                key={i}
                                                onClick={this.handlePostClick(arr[arr.length - i - 1].post_id)}
                                            >
                                                <Paper
                                                    className={classes.paper}
                                                >
                                                    <Typography variant='h5'>
                                                        {arr[arr.length - i - 1].caption}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        )
                                    })
                                }
                            </>
                        }
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
        const { id } = (this.props.match.params.hasOwnProperty('id')) ? this.props.match.params
            : (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user'))
                : null;
        if (!id) return <Redirect to='/' />;
        getUserProfile(id)
            .then(({ data }) => {
                const { username, user_id } = data[0]
                this.setState({
                    id: user_id,
                    username: username,
                    posts: data,
                })
            })
            .catch(err => {
                console.log('error: ', err)
            })
    };
    componentDidUpdate(pp, ps) {
        const { id } = this.props.match.params
        if (!id) return;
        if (this.state.id !== parseInt(id)) {
            getUserProfile(id)
                .then(({ data }) => {
                    const { username, user_id } = data[0]
                    this.setState({
                        id: user_id,
                        username: username,
                        posts: data,
                    })
                })
                .catch(err => {
                    console.log('error: ', err)
                })
        };
    };

    componentWillUnmount() {
        console.log('unmounting profile')
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