import React, { ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Russia, Belarus } from '../../share/Icons';

const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
});

function LanguageSwitch(): ReactElement {
    const classes = useStyles();
    const { i18n } = useTranslation();

    const handleSetRuLocale = useCallback(
        () => i18n.changeLanguage('ru'),
        [i18n],
    );

    const handleSetBeLocale = useCallback(
        () => i18n.changeLanguage('be'),
        [i18n],
    );

    return (
        <div className={classes.root}>
            <IconButton onClick={handleSetRuLocale}>
                <Russia />
            </IconButton>
            <IconButton onClick={handleSetBeLocale}>
                <Belarus />
            </IconButton>
        </div>
    );
}

export default LanguageSwitch;
