import React, { Component } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, InputAdornment, IconButton, TextField, Hidden } from '@material-ui/core';
import { Send, Clear, Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Link } from 'react-router-dom';
import firebase from '../firebase';
import { loginToBackEnd } from '../services/members';

//context 
import { Consumer } from '../contexts/Auth';

const styles = theme => ({
    paper: {
        marginTop: 5,
        marginBottom: 5,
        minWidth: '295px',
    },
    center: {
        margin: 'auto',
    },
    media: {
        height: 270,
    },
    cardContent: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    main: {
        marginTop: '5vh',
    },
    mdPaper: {
        marginTop: 5,
        marginBottom: 5,
        width: '500px',
        minWidth: '300px',
    },
    mdInput: {
        width: '310px',
    }
});

export default withStyles(styles)(class Login extends Component {

    state = {
        email: '',
        password: '',
        showPassword: false,
        users: [],
        mainPage: true,
        error: '',
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick = name => e => {
        // console.dir(e)
        // console.dir(e.currentTarget.name)
        // console.log(e.currentTarget.name);
        switch (name) {
            case 'send':
                this.handleSend();
                return;

            case 'clear':
                this.setState({
                    mainPage: !this.state.mainPage,
                })
                return;

            default:
                return;
        }
    }

    handleClickShowPassword = (e) => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }

    handleSend = () => {
        const { email, password, } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('Returns: ', response.user);
                const { uid, email, metadata: { lastSignInTime } } = response.user;
                return loginToBackEnd(uid, email, lastSignInTime);
            })
            .then(res => {
                // console.log('RES: ', res)
                return res.data
            })
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch(err => {
                const { message } = err;
                this.setState({ error: message });
            })
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSend()
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <Redirect to='/' />
                            )
                        } else {
                            return (
                                <>
                                    {(this.state.mainPage) ?
                                        <>
                                            <Hidden mdUp>
                                                <Grid container justify="center" alignItems="center" className={classes.main}>
                                                    <Card className={classes.paper}>
                                                        <Grid container justify="center" alignItems="center">
                                                            <Grid item xs={4}>
                                                                <CardMedia
                                                                    image="https://images.unsplash.com/photo-1534838525444-a4d09c0be267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80 1350w"
                                                                    title="Contemplative Reptile"
                                                                    className={classes.media}
                                                                // style={stylez.media}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <CardContent className={classes.cardContent}
                                                                //style={stylez.cardContent}
                                                                >
                                                                    <Typography variant="h3" xs={12} align='center'>
                                                                        Login
                                                                    </Typography>
                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="outlined-email-input"
                                                                            label="Email"
                                                                            type="email"
                                                                            name="email"
                                                                            autoComplete="email"
                                                                            margin="normal"
                                                                            variant="outlined"
                                                                            onChange={this.handleChange}
                                                                            value={this.state.email}
                                                                            onKeyDown={this.onKeyPress}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <form autoComplete="off">
                                                                            <TextField
                                                                                id="outlined-adornment-password"
                                                                                variant="outlined"
                                                                                type={this.state.showPassword ? 'text' : 'password'}
                                                                                name='password'
                                                                                label="Password"
                                                                                value={this.state.password}
                                                                                onChange={this.handleChange}
                                                                                onKeyDown={this.onKeyPress}
                                                                                autoComplete="new-password"
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <InputAdornment position="end">
                                                                                            <IconButton
                                                                                                aria-label="Toggle password visibility"
                                                                                                onClick={this.handleClickShowPassword}
                                                                                            >
                                                                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                                            </IconButton>
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                }}
                                                                            />
                                                                        </form>
                                                                    </Grid>
                                                                    <Grid item xs={12} style={{ marginTop: 5 }}>
                                                                        <Grid container
                                                                            direction="row"
                                                                            justify="flex-end"
                                                                            alignItems="center"
                                                                            spacing={8}
                                                                        >
                                                                            <Grid item xs={5}>
                                                                                <Button variant="contained"
                                                                                    color="secondary"
                                                                                    name='clear'
                                                                                    onClick={this.handleClick('clear')}>
                                                                                    <Clear />
                                                                                </Button>
                                                                            </Grid>
                                                                            <Grid item xs={5}>
                                                                                <Button variant="contained"
                                                                                    color="primary"
                                                                                    name='send'
                                                                                    onClick={this.handleClick('send')}>
                                                                                    <Send />
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Grid>
                                                        </Grid>
                                                    </Card>
                                                </Grid>
                                            </Hidden>
                                            <Hidden smDown>
                                                <Grid container justify="center" alignItems="center" className={classes.main}>
                                                    <Card className={classes.mdPaper}>
                                                        <Grid container justify="center" alignItems="center">
                                                            <Grid item xs={4}>
                                                                <CardMedia
                                                                    image="https://images.unsplash.com/photo-1534838525444-a4d09c0be267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80 1350w"
                                                                    title="Contemplative Reptile"
                                                                    className={classes.media}
                                                                // style={stylez.media}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <CardContent className={classes.cardContent}
                                                                //style={stylez.cardContent}
                                                                >
                                                                    <Typography variant="h3" xs={12} align='center'>
                                                                        Login
                                 </Typography>
                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="outlined-email-input"
                                                                            className={classes.mdInput}
                                                                            label="Email"
                                                                            type="email"
                                                                            name="email"
                                                                            autoComplete="email"
                                                                            margin="normal"
                                                                            variant="outlined"
                                                                            onChange={this.handleChange}
                                                                            value={this.state.email}
                                                                            onKeyDown={this.onKeyPress}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <form autoComplete="off">
                                                                            <TextField
                                                                                id="outlined-adornment-password"
                                                                                className={classes.mdInput}
                                                                                variant="outlined"
                                                                                type={this.state.showPassword ? 'text' : 'password'}
                                                                                name='password'
                                                                                label="Password"
                                                                                value={this.state.password}
                                                                                onChange={this.handleChange}
                                                                                onKeyDown={this.onKeyPress}
                                                                                autoComplete="new-password"
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <InputAdornment position="end">
                                                                                            <IconButton
                                                                                                aria-label="Toggle password visibility"
                                                                                                onClick={this.handleClickShowPassword}
                                                                                            >
                                                                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                                            </IconButton>
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                }}
                                                                            />
                                                                        </form>
                                                                    </Grid>
                                                                    <Grid item xs={12} style={{ marginTop: 5 }}>
                                                                        <Grid container
                                                                            direction="row"
                                                                            justify="flex-end"
                                                                            alignItems="center"
                                                                            spacing={8}
                                                                        >
                                                                            <Grid item xs={3}>
                                                                                <Button variant="contained"
                                                                                    color="secondary"
                                                                                    name='clear'
                                                                                    onClick={this.handleClick('clear')}>
                                                                                    <Clear />
                                                                                </Button>
                                                                            </Grid>
                                                                            <Grid item xs={3}>
                                                                                <Button variant="contained"
                                                                                    color="primary"
                                                                                    name='send'
                                                                                    onClick={this.handleClick('send')}>
                                                                                    <Send />
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Grid>
                                                        </Grid>
                                                    </Card>
                                                </Grid>
                                            </Hidden>
                                        </>
                                        :
                                        <>
                                            <Hidden mdUp>
                                                <Grid container justify="center" alignItems="center" className={classes.main}>
                                                    <Card className={classes.paper}>
                                                        <Grid container justify="center" alignItems="center">
                                                            <Grid item xs={4}>
                                                                <CardMedia
                                                                    image="https://images.unsplash.com/photo-1534838525444-a4d09c0be267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80 1350w"
                                                                    title="Contemplative Reptile"
                                                                    className={classes.media}
                                                                // style={stylez.media}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <CardContent className={classes.cardContent}
                                                                //style={stylez.cardContent}
                                                                >
                                                                    <Typography variant="h3" xs={12} align='center'>
                                                                        ?
                                                </Typography>
                                                                    <Grid container
                                                                        justify="center"
                                                                    >
                                                                        <Grid item xs={7}>
                                                                            <Grid container
                                                                                justify="center"
                                                                            >
                                                                                <Link to='/signup'>
                                                                                    <Button variant="contained"
                                                                                        color="primary"
                                                                                        name='clear'
                                                                                    >
                                                                                        Sign Up
                                                        </Button>
                                                                                </Link>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} style={{ marginTop: 5 }}>
                                                                        <Grid container
                                                                            direction="row"
                                                                            justify="flex-end"
                                                                            alignItems="center"
                                                                            spacing={8}
                                                                        >
                                                                            <Grid item xs={5}>
                                                                                <Button variant="contained"
                                                                                    color="secondary"
                                                                                    name='clear'
                                                                                    onClick={this.handleClick('clear')}>
                                                                                    <Clear />
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Grid>
                                                        </Grid>
                                                    </Card>
                                                </Grid>
                                            </Hidden>
                                            <Hidden smDown>
                                                <Grid container justify="center" alignItems="center" className={classes.main}>
                                                    <Card className={classes.mdPaper}>
                                                        <Grid container justify="center" alignItems="center">
                                                            <Grid item xs={4}>
                                                                <CardMedia
                                                                    image="https://images.unsplash.com/photo-1534838525444-a4d09c0be267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80 1350w"
                                                                    title="Contemplative Reptile"
                                                                    className={classes.media}
                                                                // style={stylez.media}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <CardContent className={classes.cardContent}
                                                                //style={stylez.cardContent}
                                                                >
                                                                    <Typography variant="h3" xs={12} align='center'>
                                                                        ?
                                                </Typography>
                                                                    <Grid container
                                                                        justify="center"
                                                                    >
                                                                        <Grid item xs={6}>
                                                                            <Grid container
                                                                                justify="center"
                                                                            >
                                                                                <Link to='/signup'>
                                                                                    <Button variant="contained"
                                                                                        color="primary"
                                                                                        name='clear'
                                                                                    >
                                                                                        Sign Up
                                                        </Button>
                                                                                </Link>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} style={{ marginTop: 5 }}>
                                                                        <Grid container
                                                                            direction="row"
                                                                            justify="flex-end"
                                                                            alignItems="center"
                                                                            spacing={8}
                                                                        >
                                                                            <Grid item xs={3}>
                                                                                <Button variant="contained"
                                                                                    color="secondary"
                                                                                    name='clear'
                                                                                    onClick={this.handleClick('clear')}>
                                                                                    <Clear />
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Grid>
                                                        </Grid>
                                                    </Card>
                                                </Grid>
                                            </Hidden>
                                        </>
                                    }
                                </>
                            )
                        }
                    }
                }
            </Consumer>
        )
    }
});