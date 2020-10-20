import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors, actions } from '../reducer';
import Section from '../../../share/Section';

const useStyles = makeStyles({
    root: {
        padding: '1em',
    },
    markdown: {
        textAlign: 'left',
    },
});

export default function News(): React.ReactElement {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { i18n } = useTranslation();

    const isPreview = useSelector(selectors.isPreview);
    const title = useSelector(selectors.title);
    const content = useSelector(selectors.content);

    useEffect(() => {
        if (!isPreview) {
            dispatch(actions.changeLanguage(i18n.language));
        }
    }, [dispatch, isPreview, i18n.language]);

    return (
        <Section className={classes.root}>
            <Typography variant="h5">
                {title}
            </Typography>
            <ReactMarkdown className={classes.markdown}>
                {content}
            </ReactMarkdown>
        </Section>
    );
}
