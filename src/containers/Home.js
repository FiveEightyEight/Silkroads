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
    headerMain: {
        marginTop: '10px',
    },
    headerSub: {
        marginBottom: '10px',
    },
    post: {

        margin: '5px',
    },
    paper: {
        width: '100%',
        height: '100px',
        paddingTop: '3px',
        paddingRight: '3px',
        paddingLeft: '3px',
        paddingBottom: '1px',
        overflowY: 'hidden',
        maxWidth: '600px',

    },
    caption: {
        height: '70px',
        overflowY: 'auto',
    },
    feed: {
        width: '100%',
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
                                    <Grid item xs={12}
                                    className={classes.headerMain}
                                    >
                                        <Typography variant='h4'
                                        align='center'
                                        >
                                            Welcome back, {user.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}
                                    className={classes.headerSub}
                                    >
                                        <Typography variant='h6'
                                        align='center'
                                        >
                                            Your ID is: {user.uid}
                                        </Typography>
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
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
                                                                <Grid container
                                                                    justify="center"
                                                                    alignItems="center"
                                                                >
                                                                    <Paper
                                                                        className={classes.paper}
                                                                    >
                                                                        <Grid item xs={12}>
                                                                            <Grid container
                                                                                justify="center"
                                                                            >
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
                                                                                </Grid>
                                                                                <Grid item xs={12}
                                                                                    className={classes.caption}
                                                                                >

                                                                                    <Typography variant='h5'>
                                                                                        {arr[arr.length - i - 1].caption}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Paper>
                                                                </Grid>
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