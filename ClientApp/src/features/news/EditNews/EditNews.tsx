import React, { useCallback } from 'react';
import ReactMde from 'react-mde';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

    const content = useSelector(selectors.content);
    const lang = useSelector(selectors.editLanguage);
    const title = useSelector(selectors.title);

    const handleChangeContent = useCallback((value: string) => {
        dispatch(actions.setContent(value));
    }, [dispatch]);
    const handleChangeEditLanguage = useCallback((value: string) => {
        dispatch(actions.changeEditLanguage(value));
    }, [dispatch]);
    const handleChangeTitle = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(actions.changeTitle(event.target.value));
        },
        [dispatch],
    );

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
                <ReactMde
                    value={content}
                    onChange={handleChangeContent}
                />
            </Section>
        </>
    );
}
