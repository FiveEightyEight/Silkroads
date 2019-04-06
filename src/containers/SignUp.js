import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, IconButton, Paper, Typography, Button,} from '@material-ui/core';
import { Visibility, VisibilityOff, Done, Clear } from '@material-ui/icons';



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
        marginTop: '20vh',
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
        showPassword: true,
        confirm: '',
        showConfirm: true,
    }

    handleChange = name => e => {
        this.setState({ [name]: e.target.value });
    }

    handleClickShowPassword = name => e => {
        this.setState({
            [name]: !this.state[name],
        })
    }


    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid container
                    justify='center'
                    alignItems="center"
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
                                    id="standard-name"
                                    label="Username"
                                    className={classes.inputs}
                                    value={this.state.username}
                                    onChange={this.handleChange('username')}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container
                                justify="center"
                            >
                                <TextField
                                    label="Email"
                                    className={classes.inputs}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    onChange={this.handleChange('email')}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container
                                justify="center"
                            >
                                <TextField
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    name='password'
                                    className={classes.inputs}
                                    label="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
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
                                    type={this.state.showConfirm ? 'text' : 'password'}
                                    name='password'
                                    className={classes.inputs}
                                    label="Confirm Password"
                                    value={this.state.confirm}
                                    onChange={this.handleChange('confirm')}
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
                                <Button variant="contained"
                                    color="secondary"
                                    name='clear'
                                >
                                    <Clear />
                                </Button>
                                <Button variant="contained"
                                    color="primary"
                                    name='clear'
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
});
