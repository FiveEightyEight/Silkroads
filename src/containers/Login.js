import React, { Component } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, InputAdornment, IconButton, TextField, Hidden } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Send, Clear } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        marginTop: 5,
        marginBottom: 5,
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
    },
    mdInput: {
        width: '310px',
    }
});

export default withStyles(styles)(class Login extends Component {

    state = {
        email: '',
        password: '',
        showPassword: true,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick = (e) => {
        // e.currentTarget.name;
    }

    handleClickShowPassword = (e) => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }

    render() {
        const { classes } = this.props;
        return (
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
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-adornment-password"
                                            variant="outlined"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name='password'
                                            label="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
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
                                                    onClick={this.handleClick}>
                                                    <Clear />
                                                </Button>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Button variant="contained"
                                                    color="primary"
                                                    name='send'
                                                    onClick={this.handleClick}>
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
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-adornment-password"
                                            className={classes.mdInput}
                                            variant="outlined"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name='password'
                                            label="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
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
                                                    onClick={this.handleClick}>
                                                    <Clear />
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained"
                                                    color="primary"
                                                    name='send'
                                                    onClick={this.handleClick}>
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
        )
    }
});