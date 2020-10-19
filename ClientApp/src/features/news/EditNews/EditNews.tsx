import React, { useCallback } from 'react';
import ReactMde from 'react-mde';
import { useSelector, useDispatch } from 'react-redux';
import Section from '../../../share/Section';
import { selectors, actions } from '../reducer';
import 'react-mde/lib/styles/css/react-mde-all.css';

export default function EditNews(): React.ReactElement {
    const dispatch = useDispatch();

    const content = useSelector(selectors.content);

    const handleChangeContent = useCallback((value: string) => {
        dispatch(actions.setContent(value));
    }, [dispatch]);

    return (
        <Section>
            <ReactMde
                value={content}
                onChange={handleChangeContent}
            />
        </Section>
    );
}
