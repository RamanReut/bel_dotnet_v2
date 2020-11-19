import React, { ReactElement, ReactChild } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FloatingPanel from '../FloatingPanel';

const useStyles = makeStyles((theme) => ({
    root: {
        '&>*': {
            marginLeft: '0.4em',
            '&:hover': {
                backgroundColor: theme.palette.secondary.main,
            },
        },
    },
}));

interface FabPanelProps {
    children: ReactChild | ReactChild[];
}

function FabPanel({ children }: FabPanelProps): ReactElement {
    const classes = useStyles();

    return (
        <FloatingPanel className={classes.root}>
            {children}
        </FloatingPanel>
    );
}

export default FabPanel;
