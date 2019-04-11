import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, AppBar, } from '@material-ui/core/';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Folder from '@material-ui/icons/Folder';

const styles = {
    root: {
        width: '100%',
    },
    bottomBar: {
        top: 'auto',
        bottom: 0,
      },
};

export default withStyles(styles)(props => {
    const { classes: { root }, value, handleChange } = props;
    return (
            <BottomNavigation value={value} onChange={handleChange} className={root} position='sticky'>
                <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Folder" value="folder" icon={<Folder />} />
            </BottomNavigation>
    );
});

// BottomNav.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

