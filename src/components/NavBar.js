
import React, { Component } from 'react';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle, Send } from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    grow: {
        flexGrow: 1,
    },
});

export default withStyles(styles)(class NavBar extends Component {
    state = {
        anchorEl: null,
        main: null,
        profile: null,
    };

    handleMenu = name => event => {
        this.setState({ anchorEl: event.currentTarget, [name]: true });
    };

    handleClose = () => {
        this.setState({ anchorEl: null, main: false, profile: false });
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = this.state.profile || false;
        const menu = this.state.main || false;

        return (
            <AppBar color='inherit'>
                <Toolbar>
                    <IconButton className={classes.menuButton}
                        color="inherit"
                        aria-label="menu-main"
                        aria-haspopup="true"
                        aria-owns={menu ? 'menu-main' : undefined}
                        onClick={this.handleMenu('main')}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-main"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={menu}
                        onClose={this.handleClose}
                    >
                        <Link to='/' style={{ textDecoration: 'none', backgroundColor: 'red' }}>
                            <MenuItem onClick={this.handleClose}>Home</MenuItem>
                        </Link>
                        <MenuItem onClick={this.handleClose}>Threads</MenuItem>
                    </Menu>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Silkroads
                    </Typography>
                    <Consumer>
                        {
                            (user) => {
                                if (user) {
                                    return (
                                        <div>
                                            <IconButton
                                                aria-owns={open ? 'menu-appbar' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.handleMenu('profile')}
                                                color="inherit"
                                            >
                                                <AccountCircle />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={open}
                                                onClose={this.handleClose}
                                            >
                                                <Link to='/profile'>
                                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                                </Link>
                                                <Link to='/logout'>
                                                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                                </Link>
                                            </Menu>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <>
                                            <Link to='/'>
                                                <Send />
                                            </Link>
                                        </>
                                    )
                                }
                            }
                        }
                    </Consumer>
                </Toolbar>
            </AppBar>
        )
    }
})