import { createSlice } from '@reduxjs/toolkit';
import * as types from './types';

const initialState: types.NewsState = {
    content: '',
};

const slice = createSlice({
    name: 'news',
    initialState,
    reducers: {

    },
});

export const { actions } = slice;
export const { reducer } = slice;
