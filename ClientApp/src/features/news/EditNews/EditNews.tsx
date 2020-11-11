import React, { useCallback, useEffect } from 'react';
import ReactMde from 'react-mde';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import Section from '../../../share/Section';
import { selectors, actions } from '../reducer';
import SelectLanguage from '../../../share/SelectLanguage';
import EditPageActions from '../../../share/EditPageActions';
import CloudinaryUpload from '../../../share/CloudinaryUpload';
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
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const params = useParams<EditPageParams>();

    const content = useSelector(selectors.content);
    const lang = useSelector(selectors.language);
    const title = useSelector(selectors.title);
    const previewImage = useSelector(selectors.previewImage);

    const handleChangeContent = useCallback((value: string) => {
        dispatch(actions.changeContent(value));
    }, [dispatch]);

    const handleChangeEditLanguage = useCallback((value: string) => {
        dispatch(actions.changeLanguage(value));
    }, [dispatch]);

    const handleChangeTitle = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(actions.changeTitle(event.target.value));
        },
        [dispatch],
    );

    const handleChangePreviewImage = useCallback((imageId: string) => {
        dispatch(actions.changePreviewImage(imageId));
    }, [dispatch]);

    const handlePreview = useCallback(() => {
        dispatch(actions.enablePreview());
        history.push(`/news/${params.id}`);
    }, [history, params, dispatch]);

    const handleApply = useCallback(() => {
        if (params.id === 'new') {
            dispatch(actions.newPage());
        } else {
            dispatch(actions.updatePage(parseInt(params.id, 10)));
        }
    }, [dispatch, params.id]);

    useEffect(() => {
        dispatch(actions.disablePreview());
    }, [dispatch]);

    useEffect(() => {
        if (params.id !== 'new') {
            dispatch(actions.getPageData(parseInt(params.id, 10)));
        }
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
                <ReactMde
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
