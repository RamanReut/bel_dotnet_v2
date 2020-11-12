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

interface SaveChangesOptions {
    onFulfilled?: (resp: Response) => void;
    onRejected?: (err: Error) => void;
    onFinally?: () => void;
}

const newPage = createAsyncThunk(
    'news/createNewPage',
    async (options: SaveChangesOptions | undefined, thunkApi) => {
        const state = rootSelector(thunkApi.getState() as RootState);
        newPageRequest(state)
            .then(options?.onFulfilled)
            .catch(options?.onRejected)
            .finally(options?.onFinally);
    },
);

interface UpdatePageOptions extends SaveChangesOptions {
    pageId: number;
}

const updatePage = createAsyncThunk(
    'news/updatePage',
    async (options: UpdatePageOptions, thunkApi) => {
        const state = rootSelector(thunkApi.getState() as RootState);
        updatePageRequest({
            ...state,
            id: options.pageId,
        })
            .then(options.onFulfilled)
            .catch(options.onRejected)
            .finally(options.onFinally);
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
