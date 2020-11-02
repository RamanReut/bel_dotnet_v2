import React, { ReactElement, ReactChildren, ReactChild } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: '95vh',
        width: '100%',
    },
});

export interface CenteredContainerProps {
    children: ReactChildren | ReactChild | ReactChild[];
}

export default function CenteredContainer({
    children,
}: CenteredContainerProps): ReactElement {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.root}
            justify="space-around"
            alignItems="center"
        >
            <Grid item>
                {children}
            </Grid>
        </Grid>
    );
}
