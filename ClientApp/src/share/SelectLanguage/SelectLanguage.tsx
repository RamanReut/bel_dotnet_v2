import React, { useCallback } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export interface SelectLanguageProps {
    lang: string;
    onChange: (lang: string) => void;
}

export default function SelectLanguage({
    lang,
    onChange,
}: SelectLanguageProps): React.ReactElement {
    const handleChange = useCallback((event) => {
        onChange(event.target.value);
    }, [onChange]);

    return (
        <Select
            value={lang}
            onChange={handleChange}
        >
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="be">Белорусский</MenuItem>
        </Select>
    );
}
