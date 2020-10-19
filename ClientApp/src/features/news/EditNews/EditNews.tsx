import React, { useCallback } from 'react';
import ReactMde from 'react-mde';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Section from '../../../share/Section';
import { selectors, actions } from '../reducer';
import 'react-mde/lib/styles/css/react-mde-all.css';
import SelectLanguage from '../../../share/SelectLanguage';

const useStyles = makeStyles({
    root: {
        padding: '1em',
        '&>*': {
            marginBottom: '1em',
        },
    },
});

export default function EditNews(): React.ReactElement {
    const dispatch = useDispatch();
    const classes = useStyles();

    const content = useSelector(selectors.content);
    const lang = useSelector(selectors.editLanguage);

    const handleChangeContent = useCallback((value: string) => {
        dispatch(actions.setContent(value));
    }, [dispatch]);
    const handleChangeEditLanguage = useCallback((value: string) => {
        dispatch(actions.changeEditLanguage(value));
    }, [dispatch]);

    return (
        <>
            <Section className={classes.root}>
                <SelectLanguage
                    lang={lang}
                    onChange={handleChangeEditLanguage}
                />
                <ReactMde
                    value={content}
                    onChange={handleChangeContent}
                />
            </Section>
        </>
    );
}
