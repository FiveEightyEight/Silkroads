import React, { Component } from 'react';
import { Grid, Paper, InputAdornment, IconButton, MenuItem, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = {
    paper: {
        padding: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    center: {
        margin: 'auto',
    }
}

export default class Login extends Component {

    state = {
        showPassword: true,
    }

    handleClickShowPassword = (e) => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }

    render() {
        return (
            <Grid container alignItems="center">
                <Grid item sm={12}>
                    <Grid container justify="center" >
                        <Paper style={styles.paper} sm={8}>
                            <Grid container>
                                <Grid item sm={4}></Grid>
                                <Grid item sm={8}>
                                    <Grid sm={12}>
                                        <TextField
                                            id="outlined-email-input"
                                            label="Email"
                                            // className={classes.textField}
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid sm={12}>
                                        <TextField
                                            id="outlined-adornment-password"
                                            // className={classNames(classes.margin, classes.textField)}
                                            variant="outlined"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            label="Password"
                                            // value={this.state.password}
                                            // onChange={this.handleChange('password')}
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
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
};

