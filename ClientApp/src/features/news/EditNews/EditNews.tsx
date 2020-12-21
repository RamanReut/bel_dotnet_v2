import React, {
    useCallback,
    useEffect,
} from 'react';
import {
    useHistory,
    useParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '../../store';
import Section from '../../../share/Section';
import {
    selectors,
    actions,
} from '../reducer';
import SelectLanguage from '../../../share/SelectLanguage';
import EditPageActions from '../../../share/EditPageActions';
import CloudinaryUpload from '../../../share/CloudinaryUpload';
import MarkdownEditor from '../../../share/MarkdownEditor';
import 'react-mde/lib/styles/css/react-mde-all.css';
import LabeledContainer from './LabeledContainer';

const useStyles = makeStyles({
    root: {
        padding: '1em',
        '&>*': {
            marginBottom: '1em',
        },
    },
});

interface EditPageParams {
    id: string;
}

export default function EditNews(): React.ReactElement {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const params = useParams<EditPageParams>();
    const { enqueueSnackbar } = useSnackbar();

    const content = useSelector(selectors.edit.content);
    const lang = useSelector(selectors.edit.language);
    const title = useSelector(selectors.edit.title);
    const previewImage = useSelector(selectors.edit.previewImage);

    const handleChangeContent = useCallback((value: string) => {
        dispatch(actions.edit.changeContent(value));
    }, [dispatch]);

    const handleChangeEditLanguage = useCallback((value: string) => {
        dispatch(actions.edit.changeLanguage(value));
    }, [dispatch]);

    const handleChangeTitle = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(actions.edit.changeTitle(event.target.value));
        },
        [dispatch],
    );

    const handleChangePreviewImage = useCallback((imageId: string) => {
        dispatch(actions.edit.changePreviewImage(imageId));
    }, [dispatch]);

    const handlePreview = useCallback(() => {
        dispatch(actions.common.enablePreview());
        history.push(`/news/${params.id}`);
    }, [history, params, dispatch]);

    const handleSuccessSavePage = useCallback((id) => {
        history.push(`/news/${id}`);
    }, [history]);

    const handleErrorSaveChanges = useCallback(() => {
        enqueueSnackbar(t('savePageError'), {
            variant: 'error',
        });
    }, [enqueueSnackbar, t]);

    const handleApply = useCallback(
        () => {
            dispatch(actions.edit.savePage())
                .then(unwrapResult)
                .then(handleSuccessSavePage)
                .catch(handleErrorSaveChanges);
        },
        [dispatch, handleErrorSaveChanges, handleSuccessSavePage],
    );

    useEffect(() => {
        dispatch(actions.common.disablePreview());
    }, [dispatch]);

    useEffect(() => {
        const id = (() => {
            if (params.id === 'new') {
                return 'new';
            }
            return parseInt(params.id, 10);
        })();

        dispatch(actions.edit.initWithNews(id));
    }, [dispatch, params.id]);

    return (
        <>
            <Section className={classes.root}>
                <SelectLanguage
                    lang={lang}
                    onChange={handleChangeEditLanguage}
                />
                <LabeledContainer title={t('title')}>
                    <TextField
                        value={title}
                        onChange={handleChangeTitle}
                        fullWidth
                    />
                </LabeledContainer>
                <LabeledContainer title={t('preview')}>
                    <CloudinaryUpload
                        image={previewImage}
                        onChange={handleChangePreviewImage}
                    />
                </LabeledContainer>
                <Typography variant="h6">
                    {t('content')}
                </Typography>
                <MarkdownEditor
                    value={content}
                    onChange={handleChangeContent}
                />
            </Section>
            <EditPageActions
                onApply={handleApply}
                onCancel={() => { }}
                onPreview={handlePreview}
            />
        </>
    );
}
