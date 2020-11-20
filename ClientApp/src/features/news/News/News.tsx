import React, { useEffect, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { useSnackbar } from 'notistack';
import { selectors, actions } from '../reducer';
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

interface SuccessNewPage {
    id: number;
}

export default function News(): React.ReactElement {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
    const { id } = useParams<NewsParams>();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const isPreview = useSelector(selectors.isPreview);
    const title = useSelector(selectors.title);
    const content = useSelector(selectors.content);
    const isLoading = useSelector(selectors.isContentLoading);
    const isLoadSuccess = useSelector(selectors.isContentLoadSuccess);
    const previewLanguage = useSelector(selectors.language);

    const handleChangePreviewLanguage = useCallback(
        (language: string) => {
            dispatch(actions.changeLanguage(language));
        },
        [dispatch],
    );

    const handleSuccessNewPage = useCallback(
        (resp: Response) => {
            resp
                .json()
                .then(({ id: pageId }: SuccessNewPage) => {
                    history.push(`/news/${pageId}`);
                });
            dispatch(actions.disablePreview());
        },
        [dispatch, history],
    );

    const handleSuccessUpdatePage = useCallback(
        () => dispatch(actions.disablePreview()),
        [dispatch],
    );

    const handlePageUpdateFail = useCallback(
        () => {
            enqueueSnackbar(t('savePageError'), { variant: 'error' });
        },
        [enqueueSnackbar, t],
    );

    const handleApplyChanges = useCallback(
        () => {
            if (id === 'new') {
                dispatch(actions.newPage({
                    onFulfilled: handleSuccessNewPage,
                    onRejected: handlePageUpdateFail,
                }));
            } else {
                dispatch(actions.updatePage({
                    pageId: parseInt(id, 10),
                    onFulfilled: handleSuccessUpdatePage,
                    onRejected: handlePageUpdateFail,
                }));
            }
        },
        [
            id,
            dispatch,
            handleSuccessNewPage,
            handlePageUpdateFail,
            handleSuccessUpdatePage,
        ],
    );

    const handleCancelChanges = useCallback(
        () => {

        },
        [],
    );

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
