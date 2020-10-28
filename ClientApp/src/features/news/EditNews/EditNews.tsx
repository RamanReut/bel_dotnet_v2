import React, { useCallback, useEffect } from 'react';
import ReactMde from 'react-mde';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import Section from '../../../share/Section';
import { selectors, actions } from '../reducer';
import 'react-mde/lib/styles/css/react-mde-all.css';
import SelectLanguage from '../../../share/SelectLanguage';
import EditPageActions from '../../../share/EditPageActions';

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

    const handlePreview = useCallback(() => {
        dispatch(actions.enablePreview());
        history.push(`/news/${params.id}`);
    }, [history, params, dispatch]);

    const handleApply = useCallback(() => {
        dispatch(actions.newPage());
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.disablePreview());
    }, [dispatch]);

    return (
        <>
            <Section className={classes.root}>
                <SelectLanguage
                    lang={lang}
                    onChange={handleChangeEditLanguage}
                />
                <Grid container>
                    <Grid
                        item
                        sm={2}
                        xs={12}
                    >
                        <Typography
                            variant="h6"
                            align="left"
                        >
                            {t('title')}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sm={10}
                        xs={12}
                    >
                        <TextField
                            value={title}
                            onChange={handleChangeTitle}
                            fullWidth
                        />
                    </Grid>
                </Grid>
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
