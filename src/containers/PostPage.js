import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { getPost } from '../services/members';

const styles = theme => ({
    avatar: {
        margin: 10,
    },
    paper: {
        width: '100%',
        // height: '100px',
        padding: '3px',
    },
    caption: {
        margin: '5px'
    }
});

export default withStyles(styles)(class PostPage extends Component {
    state = {

    };

    PostPage = (classes, user) => {
        const { username, caption, date_created} = this.state;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Avatar src="https://images.unsplash.com/photo-1534838525444-a4d09c0be267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80 1350w"
                                    alt="Remy Sharp" className={classes.avatar} />
                                <Typography variant='h4'>
                                    <strong>{username}</strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2'
                                className={classes.caption}
                                >
                                    {caption}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                            <Typography variant='caption'
                            align='right'
                            >
                                Posted On: {date_created}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    };

    componentDidMount() {
        const { post_id } = this.props.match.params;
        console.log(post_id)
        getPost(post_id)
            .then(({ data }) => {
                console.log(data)
                this.setState({ ...data })
            })
            .catch(err => {
                console.log(err)
            })
    };

    render() {
        const { classes } = this.props;
        return (
            <Consumer>
                {
                    (user) => {
                        if (!user) return <Redirect to='/' />
                        else return this.PostPage(classes, user)
                    }
                }
            </Consumer>
        );
    };
});