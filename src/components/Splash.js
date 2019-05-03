import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, LinearProgress, Paper, Typography, } from '@material-ui/core';

const styles = theme => ({

    parent: {
        // display: 'table',
        marginTop: '25vh',
        display: 'block',
        width: '100%',
        height: '100%',
    },
    form: {
        height: '150px',
        width: '250px',
        backgroundImage: 'url(https://lh3.googleusercontent.com/4Sc8n1M4VWRCiCg-Be38GlLAZxGKPncH2H9kQuouSHesRJ_Tiv3GFQcCpA2FeYq2SCO1nMRzkA3Y9-itFJvs1k2qInp7FGSxkXakkMT2sypsYJjaVxChOU0xf-L-5Nqn_bLLm5D8O40TDLdHBhpj8x7cBIJn1-Xh0C2pWVYAVRO9qHx3_cTayU5u1roJXkJSqFUYMpW4WhqQyslSEyWWuxSrWfudXAx0a2yUAWm3Fo4vE7fjrNN0cLIOBQD2_SuZOeZ6g5GbsW-g5WC-9SbRVnpFfKgypLFVf2fg2al1UtkEaHmudTiDkCkHxbM4v5FNcNzk5PUHv__R1vKSmAz87b6JMiM80kYc_JJS1vGY8yYIuEh6kRnp5f-GHmnaBtFPRSOH_mDLfVYyBEGOivt3LPiS7X4uvDqfHTC8-uTY-17YXuWmLlYLGOExF8SGb6wFHIB5WzgikIuBOfAAiNodNseWe4tYB3ki3WU2Wj43Wbcwwa5gL5NuYrO2YXmAOn5b0NqPsYw0Pgf3Tp4ajmL3MEeN5i-BUVhPOEbk90hfDGldfY-eE4Ov1wqkBWcwq709Dbb1vzht4cSU8zkoh7URb4EbJAd3iSYJunzIxbhmdVuYgir2jkaiYTFBcYZJdz5-HO8azVPDNXxwdmGmLJAk7VlNA7na6lI=w330-h250-no)',
        // objectFit: 'cover',
    },
    linearColorPrimary: {
        backgroundColor: '#FEFEFE',
    },
    linearBarColorPrimary: {
        // backgroundColor: '#00695c',
        backgroundColor: '#137cca',
    },
    header: {
        marginTop: '2vh',
    },
    font: {
        color: 'white',
        textShadow: '2px 2px grey',
    },
    load: {
        color: 'white',
        marginTop: '50px',
    }

});

export default withStyles(styles)(props => {
    const { classes } = props;
    return (

        <Grid container
            className={classes.parent}
        >
            <Grid
                item xs={12}
                container
                direction="row"
                justify="center"
                alignItems="center"

            >
                <Paper elevation={20}
                    square={false}
                    className={classes.form}
                >
                    <Grid item xs={12}
                        className={classes.header}
                    >
                        <Typography variant='h4'
                            align='center'
                            className={classes.font}
                        >
                            <strong><em>Silkroads</em></strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LinearProgress
                            classes={{
                                colorPrimary: classes.linearColorPrimary,
                                barColorPrimary: classes.linearBarColorPrimary,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'
                            align='center'
                            className={classes.load}
                        >
                            Loading...
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    )
});