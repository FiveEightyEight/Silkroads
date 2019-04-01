import React from 'react';
import { Paper, Tabs, Typography } from '@material-ui/core';
import  Tab  from '@material-ui/core/Tab/Tab';

export default props => {
    return (
        <>
        <Paper>
            <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                centered>
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
        </Paper>
        </>
    )
};