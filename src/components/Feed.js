import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, IconButton, Paper, Typography, Button, } from '@material-ui/core';

// Context


const styles = theme => ({

    block: {
        marginTop: '5px',
        marginBottom: '5px',
    }
    
});

export default withStyles(styles)(props => {
    const { classes } = props;
    return (
        <Grid container className={classes.block} >
            <Grid item xs={12}>
                <Paper>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h5'
                            >
                                Title Goes Here
                            </Typography>
                        </Grid>
                            <Typography variant='body1'
                            >
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum reiciendis accusamus aperiam quisquam fugit eum, 
                                temporibus dolorem ducimus. Reprehenderit cum molestiae commodi sit tenetur incidunt, quisquam alias voluptas quidem laborum.
                            </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
})