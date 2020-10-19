/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsState } from './types';
import { setTranslation } from '../../../share/translationContainer';

const initialState: NewsState = {
    content: {
        ru: '',
        be: '',
    },
    editLanguage: 'ru',
};

const slice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setContent(state: NewsState, { payload }: PayloadAction<string>) {
            state.content = setTranslation<string>(
                state.content,
                state.editLanguage,
                payload,
            );
        },
        changeEditLanguage(state: NewsState, { payload }: PayloadAction<string>) {
            state.editLanguage = payload;
        },
    },
});

export const { actions } = slice;
export const { reducer } = slice;
