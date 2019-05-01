import React, { Component } from 'react';
import { signUpNewMember } from '../services/members'
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, IconButton, Paper, Typography, Button, } from '@material-ui/core';
import { Visibility, VisibilityOff, Done, Clear } from '@material-ui/icons';
import { Redirect, Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import firebase from '../firebase';

// context 
import { Consumer } from '../contexts/Auth';

const styles = theme => ({
    paper: {
        padding: '20px',
    },
    paperXS: {
        padding: '20px',
        minWidth: '295px',
    },
    paperMD: {
        padding: '20px',
        width: '500px',
        minWidth: '300px',
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
    },
    inputs: {
        width: '100%',
    }
});

export default withStyles(styles)(class SignUp extends Component {
    state = {
        signup: 0,
        username: '',
        email: '',
        password: '',
        showPassword: false,
        confirm: '',
        showConfirm: false,
        valid: { username: true, email: true, password: true, confirm: true },
        realTime: true,
        error: null,
    }

    handleChange = name => e => {
        this.setState({ [name]: e.target.value }, () => {
            if (name === 'password' || name === 'confirm') this.handlePWChk(e)
        });
    }

    handleClickShowPassword = name => e => {
        this.setState({
            [name]: !this.state[name],
        })
    }

    handleClick = name => e => {
        switch (name) {
            case 'done':
                this.handleValidation();
                return;

            case 'clear':
                return;

            default:
                return;
        }
    }

    handleValidation = () => {
        const { username, email, password, confirm, valid } = this.state;
        (!username) ? valid.username = false : valid.username = true;
        (!isEmail(email)) ? valid.email = false : valid.email = true;
        (!password) ? valid.password = false : valid.password = true;
        (!confirm) ? valid.confirm = false : valid.confirm = true;
        if (valid.password && valid.confirm) {
            if (password !== confirm) {
                valid.password = false;
                valid.confirm = false;
            };
        };
        const values = Object.values(valid);
        if (values.includes(false)) {
            this.setState({
                valid,
            })
        } else {
            this.handleSend(email, password);
        }
    }

    handlePWChk = (e) => {
        const { password, confirm, } = this.state;
        if (!password || !confirm) return;
        if (password !== confirm) {
            this.setState({
                realTime: false,
            });
            return;
        }
        this.setState({
            realTime: true,
        });

    }

    handleSend = (email, password) => {
        const { username } = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                return signUpNewMember(username, email, password, response.user.uid);
            })
            .then( res => {
                return res.data.data
            })
            .then( user => {
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch(err => {
                const { message } = err;
                this.setState({ error: message });
            })
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleValidation();
        }
    }

    render() {
        const { classes } = this.props;
        const { username, email, password, confirm } = this.state.valid;
        const { error, realTime } = this.state;
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
                                    <Grid container
                                        justify='center'
                                        alignItems="center"
                                        className={classes.main}
                                    >
                                        <Paper className={classes.paper}>
                                            <Grid item xs={12}>
                                                <Grid container
                                                    justify="center"
                                                >
                                                    <Typography variant='h4'>
                                                        Sign Up
                                </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container
                                                    justify="center"
                                                >
                                                    <TextField
                                                        error={!username}
                                                        id="standard-name"
                                                        label="Username"
                                                        className={classes.inputs}
                                                        value={this.state.username}
                                                        onChange={this.handleChange('username')}
                                                        margin="normal"
                                                        helperText={error}
                                                        onKeyDown={this.onKeyPress}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container
                                                    justify="center"
                                                >
                                                    <TextField
                                                        error={!email}
                                                        label="Email"
                                                        className={classes.inputs}
                                                        type="email"
                                                        name="email"
                                                        autoComplete="email"
                                                        margin="normal"
                                                        onChange={this.handleChange('email')}
                                                        onKeyDown={this.onKeyPress}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container
                                                    justify="center"
                                                >
                                                    <TextField
                                                        error={!password || !realTime}
                                                        type={this.state.showPassword ? 'text' : 'password'}
                                                        name='password'
                                                        className={classes.inputs}
                                                        label="Password"
                                                        value={this.state.password}
                                                        onChange={this.handleChange('password')}
                                                        onKeyDown={this.onKeyPress}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="Toggle password visibility"
                                                                        onClick={this.handleClickShowPassword('showPassword')}
                                                                    >
                                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container
                                                    justify="center"
                                                >
                                                    <TextField
                                                        error={!confirm || !realTime}
                                                        type={this.state.showConfirm ? 'text' : 'password'}
                                                        name='password'
                                                        className={classes.inputs}
                                                        label="Confirm Password"
                                                        value={this.state.confirm}
                                                        onChange={this.handleChange('confirm')}
                                                        onKeyDown={this.onKeyPress}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="Toggle password visibility"
                                                                        onClick={this.handleClickShowPassword('showConfirm')}
                                                                    >
                                                                        {this.state.showConfirm ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: 10 }}>
                                                <Grid container
                                                    direction="row"
                                                    justify="space-evenly"
                                                    alignItems="center"
                                                    spacing={8}
                                                >
                                                    <Link to='/'>
                                                        <Button variant="contained"
                                                            color="secondary"
                                                            name='clear'
                                                        >
                                                            <Clear />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="contained"
                                                        color="primary"
                                                        name='done'
                                                        onClick={this.handleClick('done')}
                                                    >
                                                        <Done />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                </>
                            )
                        }
                    }
                }
            </Consumer>
        )
    }
});
