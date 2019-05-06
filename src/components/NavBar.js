
import React, { Component } from 'react';
import { AppBar, Grid, IconButton, InputAdornment, Menu, MenuItem, Toolbar, TextField, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle, Send, Search } from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';
import { getAllMembers } from '../services/members';

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    grow: {
        flexGrow: 1,
    },
    margin: {

    }
});

export default withStyles(styles)(class NavBar extends Component {
    state = {
        anchorEl: null,
        main: null,
        profile: null,
        fetched: false,
        search: '',
        allUsers: [],
        searchError: false,
    };

    handleOnChange = name => e => {
        this.setState({
            [name]: e.target.value,
        });
    };

    handleMenu = name => event => {
        this.setState({ anchorEl: event.currentTarget, [name]: true });
    };

    handleClose = () => {
        this.setState({ anchorEl: null, main: false, profile: false });
    }
    getUsers = () => {
        getAllMembers()
            .then(({ data }) => {
                console.log(data);
                this.setState({
                    allUsers: data,
                    fetched: true,
                })
            })
            .catch(err => {
                console.log('error retrieveing users')
            });
    };

    handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleValidation();
        };
    };

    handleValidation = () => {
        const search  = this.state.search.trim().toLowerCase();
        const { allUsers } = this.state;
        for (let user of allUsers) {
            if (user.username.toLowerCase() === search){
                this.setState({
                    search: '',
                    searchError: false,
                })        
                this.props.history.push(`/profile/${user.user_id}`);
                return;
            };
        };
        this.setState({
            searchError: true,
        })
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, search, searchError, fetched } = this.state;
        const open = this.state.profile || false;
        const menu = this.state.main || false;

        return (
            <AppBar color='inherit'>
                <Toolbar>
                    <Grid container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >

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

                        <Consumer>
                            {
                                (user) => {
                                    if (user) {
                                        if (!fetched) this.getUsers();
                                        return (
                                            <>
                                                <Grid item>
                                                    <TextField
                                                        className={classes.margin}
                                                        id="input-with-icon-textfield"
                                                        onChange={this.handleOnChange('search')}
                                                        value={search}
                                                        onKeyDown={this.handleOnKeyPress}
                                                        error={searchError}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Search />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
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
                                                        <Link to='/post'>
                                                            <MenuItem onClick={this.handleClose}>Create Post</MenuItem>
                                                        </Link>
                                                        <Link to='/logout'>
                                                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                                        </Link>
                                                    </Menu>
                                                </Grid>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <Grid item>
                                                    <Typography variant="h6" color="inherit" className={classes.grow}>
                                                        Silkroads
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Link to='/'>
                                                        <Send />
                                                    </Link>
                                                </Grid>
                                            </>
                                        )
                                    }
                                }
                            }
                        </Consumer>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
})