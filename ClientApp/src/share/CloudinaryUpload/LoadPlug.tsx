import React, { ReactElement } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';
import { DEFAULT_HEIGHT, SMALL_DEVICE_HEIGHT } from './constants';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        backgroundColor: fade(theme.palette.background.paper, 0.6),
        height: DEFAULT_HEIGHT,
        [theme.breakpoints.only('xs')]: {
            height: SMALL_DEVICE_HEIGHT,
        },
    },
    active: {
        zIndex: 2,
    },
}));

export interface LoadPlugProps {
    isActive: boolean;
}

export default function LoadPlug({
    isActive,
}: LoadPlugProps): ReactElement {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classnames(classes.root, { [classes.active]: isActive })}
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <CircularProgress color="secondary" />
            </Grid>
        </Grid>
    );
}
