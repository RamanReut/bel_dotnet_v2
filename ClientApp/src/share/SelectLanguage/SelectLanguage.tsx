import React, { useCallback } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

export interface SelectLanguageProps {
    lang: string;
    onChange: (lang: string) => void;
}

export default function SelectLanguage({
    lang,
    onChange,
}: SelectLanguageProps): React.ReactElement {
    const { t } = useTranslation();

    const handleChange = useCallback((event) => {
        onChange(event.target.value);
    }, [onChange]);

    return (
        <Grid
            container
            alignItems="center"
        >
            <Grid
                item
                sm={2}
                xs={12}
            >
                <Typography
                    variant="h6"
                    align="left"
                >
                    {t('languageLabel')}
                </Typography>
            </Grid>
            <Grid
                item
                sm={10}
                xs={12}
            >
                <Select
                    value={lang}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value="ru">{t('languages.ru')}</MenuItem>
                    <MenuItem value="be">{t('languages.be')}</MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
}
