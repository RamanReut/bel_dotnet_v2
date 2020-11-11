/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { NewsState, RootState } from './types';
import { setTranslation } from '../../../share/translationContainer';
import { rootSelector } from './selectors';
import {
    newPageRequest,
    getPage,
    Page,
    updatePageRequest,
} from '../services';

const newPage = createAsyncThunk(
    'news/createNewPage',
    async (_, thunkApi) => {
        const state = rootSelector(thunkApi.getState() as RootState);
        const resp = await newPageRequest(state);

        return resp.ok;
    },
);

const updatePage = createAsyncThunk(
    'news/updatePage',
    async (pageId: number, thunkApi) => {
        const state = rootSelector(thunkApi.getState() as RootState);
        const resp = await updatePageRequest({
            ...state,
            id: pageId,
        });

        return resp.ok;
    },
);

const getPageData = createAsyncThunk(
    'news/getPageData',
    async (id: number) => {
        const pageInfo = await getPage(id);
        return pageInfo;
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
    previewImage: '',
    isPreview: false,
    isContentLoadSuccess: true,
    isContentLoading: false,
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
        changePreviewImage(state: NewsState, { payload }: PayloadAction<string>) {
            state.previewImage = payload;
        },
        enablePreview(state: NewsState) {
            state.isPreview = true;
        },
        disablePreview(state: NewsState) {
            state.isPreview = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getPageData.pending,
            (state: NewsState) => {
                state.isContentLoading = true;
            },
        );
        builder.addCase(
            getPageData.fulfilled,
            (state: NewsState, { payload }: PayloadAction<Page>) => {
                state.content = payload.content;
                state.title = payload.title;
                state.previewImage = payload.previewImage;
                state.isContentLoadSuccess = true;
                state.isContentLoading = false;
            },
        );
        builder.addCase(
            getPageData.rejected,
            (state: NewsState) => {
                state.isContentLoading = false;
                state.isContentLoadSuccess = false;
            },
        );
    },
});

export const actions = {
    ...slice.actions,
    newPage,
    updatePage,
    getPageData,
};
export const { reducer } = slice;
