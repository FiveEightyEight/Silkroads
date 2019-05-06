import React, { Component } from 'react';
import Login from './Login'
import BottomNav from '../components/BottomNav';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
// import Feed from '../components/Feed';
import { getAllPosts } from '../services/members';
// Contexts
import { Consumer } from '../contexts/Auth';
const windowHeight = window.innerHeight;

const styles = theme => ({
    home: {
        height: '100%',
    },
    post: {

        margin: '5px',
    },
    paper: {
        width: '100%',
        height: '100px',
        padding: '3px',
    },
    feed: {
        width:'100%',
        height: `calc(${windowHeight}px - 300px)`,
        overflowY: 'auto',
    }
    // paper: {
    //     
    //     // height: 'calc(100% - 250px)',
    //    
    //     //     [theme.breakpoints.up('sm')]: {
    //     //         marginTop: 5,
    //     //         height: 'calc(100% - 10px)'
    //     //     },
    //     //     [theme.breakpoints.down('xs')]: {
    //     //         height: '100%'
    //     //     },
    // },

});

export default withStyles(styles)(class Home extends Component {
    state = {
        page: 'recents',
        posts: null,

    }

    componentDidMount() {
        getAllPosts()
            .then(({ data }) => {
                this.setState({
                    posts: data
                })
            })
            .catch(err => {
                console.log('error retrieving feed')
            })
    };

    handleChange = (event, page) => {
        this.setState({ page });
    };

    handlePostClick = post_id => e => {
        if (typeof post_id !== 'number') return;
        this.props.history.push(`/posts/view/${post_id}`)
    };

    render() {
        const { classes } = this.props;
        const { posts } = this.state;
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
                                    <Grid container
                                        item xs={12}
                                        className={classes.feed}

                                    >
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
                                                                    <Grid item xs={12}>
                                                                        <Grid container>
                                                                            <Grid item xs={6}>
                                                                                <Typography variant='body2'
                                                                                    align='left'
                                                                                >
                                                                                    {arr[arr.length - i - 1].username}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={6}>
                                                                                <Typography variant='caption'
                                                                                    align='right'
                                                                                >
                                                                                    {moment(arr[arr.length - i - 1].post_created).fromNow()}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <hr />
                                                                                <Typography variant='h5'>
                                                                                    {arr[arr.length - i - 1].caption}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Paper>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </>
                                        }
                                    </Grid>
                                    {/* <Paper className={classes.paper}>
                                        {
                                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((e, i) => {
                                                return <Feed key={i} />
                                            })
                                        }
                                    </Paper> */}
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