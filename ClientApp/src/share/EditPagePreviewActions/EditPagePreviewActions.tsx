import React, { ReactElement, useCallback } from 'react';
import Fab from '@material-ui/core/Fab';
import BackIcon from '@material-ui/icons/ChevronLeft';
import ApplyIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import FloatingPanel from '../FloatingPanel';
import RussiaIcon from '../Icons/RussiaIcon';
import BelarusIcon from '../Icons/BelarusIcon';

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

export interface EditPagePreviewActionsProps {
    isOpen: boolean;
    language: string;
    onLanguageClick: (language: string) => void;
    onApply: () => void;
    onCancel: () => void;
}

function EditPagePreviewActions({
    isOpen,
    language,
    onLanguageClick,
    onApply,
    onCancel,
}: EditPagePreviewActionsProps): ReactElement {
    const classes = useStyles();
    const history = useHistory();

    const handleGoBack = useCallback(() => history.goBack(), [history]);

    const handleSwitchLanguage = useCallback(
        () => {
            if (/be/.test(language)) {
                onLanguageClick('ru');
            } else {
                onLanguageClick('be');
            }
        },
        [language, onLanguageClick],
    );

    return (
        <FloatingPanel
            className={classes.root}
            isOpen={isOpen}
        >
            <Fab
                color="primary"
                onClick={handleGoBack}
            >
                <BackIcon />
            </Fab>
            <Fab
                color="primary"
                onClick={handleSwitchLanguage}
            >
                {
                    /be/.test(language)
                        ? <BelarusIcon />
                        : <RussiaIcon />
                }
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
        </FloatingPanel>
    );
}

export default EditPagePreviewActions;
