import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';
import Control from './Control';

const useStyles = makeStyles({
    toolbar: {
        padding: '0',
    },
});

function Header(): React.ReactElement {
    const classes = useStyles();

    return (
        <header>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Grid
                        container
                        justify="space-between"
                    >
                        <Grid item>
                            <Navbar />
                        </Grid>
                        <Grid item>
                            <Control />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default Header;
