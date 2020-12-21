import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import {
    useHistory,
    useParams,
} from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '../../store';
import {
    selectors,
    actions,
} from '../reducer';
import Section from '../../../share/Section';
import LoadControl from '../../../share/LoadControl';
import EditPagePreviewActions from '../../../share/EditPagePreviewActions';

const useCloudinaryImageStyles = makeStyles({
    image: {
        display: 'block',
        maxWidth: '80%',
        margin: 'auto',
        objectFit: 'contain',
    },
});

interface CloudinaryImageProps {
    src: string;
}

function CloudinaryImage({ src }: CloudinaryImageProps) {
    const classes = useCloudinaryImageStyles();

    const tester = /([\w/]+)\|([\d]{0,4})x([\d]{0,4})/g;
    const testResult = tester.exec(src);

    if (testResult) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [all, publicId, width, height] = testResult;

        return (
            <Image
                className={classes.image}
                publicId={publicId}
                width={width}
                height={height}
            />
        );
    }
    return <div />;
}

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
    const dispatch = useAppDispatch();
    const { i18n, t } = useTranslation();
    const { id } = useParams<NewsParams>();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const isPreview = useSelector(selectors.common.isPreview);
    const previewLanguage = useSelector(selectors.edit.language);
    const title = useSelector(
        isPreview
            ? selectors.edit.title
            : selectors.data.newsTitle(parseInt(id, 10), i18n.language),
    );
    const content = useSelector(
        isPreview
            ? selectors.edit.content
            : selectors.data.newsContent(parseInt(id, 10), i18n.language),
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadSuccess, setIsLoadSuccess] = useState<boolean>(true);

    const handleChangePreviewLanguage = useCallback(
        (language: string) => {
            dispatch(actions.edit.changeLanguage(language));
        },
        [dispatch],
    );

    const handleApplyChanges = useCallback(
        () => {
            dispatch(actions.edit.savePage())
                .then(unwrapResult)
                .then(
                    (respId: number) => {
                        dispatch(actions.common.disablePreview());
                        history.push(`/news/${respId}`);
                    },
                )
                .catch(
                    () => {
                        enqueueSnackbar(t('savePageError'), { variant: 'error' });
                    },
                );
        },
        [dispatch, enqueueSnackbar, history, t],
    );

    const handleCancelChanges = useCallback(
        () => {
            history.push('/');
        },
        [history],
    );

    const handleLoadNews = useCallback(
        () => {
            setIsLoading(true);
            dispatch(actions.data.initFullNews(parseInt(id, 10)))
                .then(unwrapResult)
                .then(() => {
                    setIsLoading(false);
                    setIsLoadSuccess(true);
                })
                .catch(() => {
                    setIsLoading(false);
                    setIsLoadSuccess(false);
                });
        },
        [dispatch, id],
    );

    useEffect(
        () => {
            if (!isPreview) {
                handleLoadNews();
            }
        },
        [handleLoadNews, isPreview],
    );

    return (
        <LoadControl
            isLoading={isLoading}
            isLoadSuccess={isLoadSuccess}
            onRefresh={handleLoadNews}
        >
            <Section className={classes.root}>
                <Typography variant="h5">
                    {title}
                </Typography>
                <ReactMarkdown
                    className={classes.markdown}
                    renderers={{
                        image: CloudinaryImage,
                    }}
                >
                    {content}
                </ReactMarkdown>
                <EditPagePreviewActions
                    isOpen={isPreview}
                    language={previewLanguage}
                    onLanguageClick={handleChangePreviewLanguage}
                    onApply={handleApplyChanges}
                    onCancel={handleCancelChanges}
                />
            </Section>
        </LoadControl>
    );
}
