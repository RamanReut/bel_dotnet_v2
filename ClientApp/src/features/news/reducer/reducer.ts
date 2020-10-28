/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { NewsState, RootState } from './types';
import { setTranslation } from '../../../share/translationContainer';
import { rootSelector } from './selectors';
import { newPageRequest } from '../services';

const newPage = createAsyncThunk(
    'news/createNewPage',
    async (_, thunkApi) => {
        const state = rootSelector(thunkApi.getState() as RootState);
        const resp = await newPageRequest(state);

        return resp.ok;
    },
);

const initialState: NewsState = {
    content: {
        ru: '',
        be: '',
    },
    title: {
        ru: '',
        be: '',
    },
    language: 'ru',
    isPreview: false,
};

const slice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        changeContent(state: NewsState, { payload }: PayloadAction<string>) {
            state.content = setTranslation<string>(
                state.content,
                state.language,
                payload,
            );
        },
        changeLanguage(state: NewsState, { payload }: PayloadAction<string>) {
            state.language = payload;
        },
        changeTitle(state: NewsState, { payload }: PayloadAction<string>) {
            state.title = setTranslation<string>(
                state.title,
                state.language,
                payload,
            );
        },
        enablePreview(state: NewsState) {
            state.isPreview = true;
        },
        disablePreview(state: NewsState) {
            state.isPreview = false;
        },
    },
});

export const actions = {
    ...slice.actions,
    newPage,
};
export const { reducer } = slice;
