
import React, { Component } from 'react';
import { AppBar, FormControlLabel, FormGroup, IconButton, Menu, MenuItem, Switch, Toolbar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle, Send } from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/Auth';

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
        auth: false,
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    }



    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);


        const loggedOut = <><li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li></>

        const loggedIn = <><li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
        </li></>


        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Silkroads
                </Typography>
                    <AuthContext.Consumer>
                        {
                            (user) => {
                                if (user) {
                                    return (
                                        <div>
                                            <IconButton
                                                aria-owns={open ? 'menu-appbar' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.handleMenu}
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
                                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                            </Menu>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <>
                                            <Link to='/signup'>
                                            <Send />
                                            </Link>
                                        </>
                                    )
                                }
                            }
                        }
                    </AuthContext.Consumer>
                </Toolbar>
            </AppBar>
        )
    }
})
//   return(
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <Link className="navbar-brand" to="/">Authentication</Link>
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <Link className="nav-link" to="/">Home</Link>
//         </li>

//         <AuthContext.Consumer>
//           {
//             user => {
//               if (user) return loggedIn
//               else return loggedOut
//             }
//           }
//         </AuthContext.Consumer>
//       </ul>
//     </nav>
//   )
// }