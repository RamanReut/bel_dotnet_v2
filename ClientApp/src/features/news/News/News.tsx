import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { selectors, actions } from '../reducer';
import Section from '../../../share/Section';
import LoadControl from '../../../share/LoadControl';

const useStyles = makeStyles({
    root: {
        padding: '1em',
    },
    markdown: {
        textAlign: 'left',
    },
});

interface NewsParams {
    id: string;
}

export default function News(): React.ReactElement {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const { id } = useParams<NewsParams>();

    const isPreview = useSelector(selectors.isPreview);
    const title = useSelector(selectors.title);
    const content = useSelector(selectors.content);
    const isLoading = useSelector(selectors.isContentLoading);
    const isLoadSuccess = useSelector(selectors.isContentLoadSuccess);

    useEffect(() => {
        if (!isPreview) {
            dispatch(actions.changeLanguage(i18n.language));
        }
    }, [dispatch, isPreview, i18n.language]);

    useEffect(() => {
        if (!isPreview) {
            dispatch(actions.getPageData(parseInt(id, 10)));
        }
    }, [dispatch, id, isPreview]);

    return (
        <LoadControl
            isLoading={isLoading}
            isLoadSuccess={isLoadSuccess}
        >
            <Section className={classes.root}>
                <Typography variant="h5">
                    {title}
                </Typography>
                <ReactMarkdown className={classes.markdown}>
                    {content}
                </ReactMarkdown>
            </Section>
        </LoadControl>
    );
}
