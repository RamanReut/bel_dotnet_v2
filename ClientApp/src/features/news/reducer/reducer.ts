/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsState } from './types';
import { setTranslation } from '../../../share/translationContainer';

const initialState: NewsState = {
    content: {
        ru: '',
        be: '',
    },
    title: {
        ru: '',
        be: '',
    },
    editLanguage: 'ru',
};

const slice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        changeContent(state: NewsState, { payload }: PayloadAction<string>) {
            state.content = setTranslation<string>(
                state.content,
                state.editLanguage,
                payload,
            );
        },
        changeEditLanguage(state: NewsState, { payload }: PayloadAction<string>) {
            state.editLanguage = payload;
        },
        changeTitle(state: NewsState, { payload }: PayloadAction<string>) {
            state.title = setTranslation<string>(
                state.title,
                state.editLanguage,
                payload,
            );
        },
    },
});

export const { actions } = slice;
export const { reducer } = slice;
