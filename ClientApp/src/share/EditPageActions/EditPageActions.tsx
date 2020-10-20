import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ApplyIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';
import PreviewIcon from '@material-ui/icons/Subject';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        right: '1em',
        bottom: '1em',
        '&>*': {
            marginLeft: '0.4em',
            '&:hover': {
                backgroundColor: theme.palette.secondary.main,
            },
        },
    },
}));

export interface EditPageActionsProps {
    onApply: () => void;
    onCancel: () => void;
    onPreview: () => void;
}

export default function EditPageActions({
    onApply,
    onCancel,
    onPreview,
}: EditPageActionsProps): React.ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Fab
                color="primary"
                onClick={onPreview}
            >
                <PreviewIcon />
            </Fab>
            <Fab
                color="primary"
                onClick={onApply}
            >
                <ApplyIcon />
            </Fab>
            <Fab
                color="primary"
                onClick={onCancel}
            >
                <CancelIcon />
            </Fab>
        </div>
    );
}
